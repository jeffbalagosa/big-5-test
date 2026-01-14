import { test, expect } from "@playwright/test";

const STORAGE_KEY = "big5_questionnaire_session";

test.describe("Progress persistence and resume", () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto("/");
    await page.evaluate((key) => localStorage.removeItem(key), STORAGE_KEY);
  });

  test("should persist in-progress state to localStorage", async ({ page }) => {
    await page.goto("/test-selection");

    // Start a Big-5 test
    await page.getByLabel(/Select Test Type/i).selectOption("big5");
    await page.getByPlaceholder(/Enter name/i).fill("Persistence Tester");
    await page.getByRole("button", { name: /Start Test/i }).click();

    await expect(page).toHaveURL(/\/questionnaire/);

    // Answer a few questions (first set of 3)
    for (let i = 0; i < 3; i++) {
      await page
        .getByRole("button", { name: /3\s+Neutral/i })
        .nth(i)
        .click();
    }

    // Verify localStorage has the session saved
    const savedSession = await page.evaluate((key) => {
      return localStorage.getItem(key);
    }, STORAGE_KEY);

    expect(savedSession).not.toBeNull();
    const parsed = JSON.parse(savedSession!);
    expect(parsed.authorName).toBe("Persistence Tester");
    expect(parsed.testType).toBe("big5");
    expect(parsed.isCompleted).toBe(false);
    expect(Object.keys(parsed.answers).length).toBeGreaterThan(0);
  });

  test("should restore in-progress state after page reload", async ({
    page,
  }) => {
    await page.goto("/test-selection");

    // Start a Big-5 test
    await page.getByLabel(/Select Test Type/i).selectOption("big5");
    await page.getByPlaceholder(/Enter name/i).fill("Reload Tester");
    await page.getByRole("button", { name: /Start Test/i }).click();

    await expect(page).toHaveURL(/\/questionnaire/);

    // Answer 6 questions (first 2 sets) - Big-5 uses 5-point scale with "Neutral" as value 3
    for (let i = 0; i < 6; i++) {
      const indexInSet = i % 3;
      await page
        .getByRole("button", { name: /3\s+Neutral/i })
        .nth(indexInSet)
        .click();
    }

    // Reload the page
    await page.reload();

    // Navigate to questionnaire and verify progress is restored
    await page.goto("/questionnaire");

    // The test should continue from where we left off (set 3, question 7)
    // Verify we're on the correct set by checking progress indicator
    await expect(page.getByText(/Question 7/i)).toBeVisible();
  });

  test("should show resume prompt on home page when in-progress session exists", async ({
    page,
  }) => {
    await page.goto("/test-selection");

    // Start an MBTI test
    await page.getByLabel(/Select Test Type/i).selectOption("mbti");
    await page.getByPlaceholder(/Enter name/i).fill("Resume Tester");
    await page.getByRole("button", { name: /Start Test/i }).click();

    await expect(page).toHaveURL(/\/questionnaire/);

    // Answer a few questions - MBTI uses 6-point scale with "Slightly Agree" as value 4
    for (let i = 0; i < 3; i++) {
      await page
        .getByRole("button", { name: /4\s+Slightly Agree/i })
        .nth(i)
        .click();
    }

    // Navigate to home page
    await page.goto("/");

    // Verify resume prompt is shown
    await expect(page.getByText(/Continue your last session\?/i)).toBeVisible();
    await expect(page.getByText(/MBTI test for Resume Tester/i)).toBeVisible();
    await expect(page.getByRole("link", { name: /Resume/i })).toBeVisible();
  });

  test("should not show resume prompt when no in-progress session exists", async ({
    page,
  }) => {
    // Ensure no saved session
    await page.goto("/");
    await page.evaluate((key) => localStorage.removeItem(key), STORAGE_KEY);
    await page.reload();

    // Verify no resume prompt
    await expect(
      page.getByText(/Continue your last session\?/i)
    ).not.toBeVisible();
  });

  test("should resume test and navigate to questionnaire when clicking Resume", async ({
    page,
  }) => {
    await page.goto("/test-selection");

    // Start a Big-5 test
    await page.getByLabel(/Select Test Type/i).selectOption("big5");
    await page.getByPlaceholder(/Enter name/i).fill("Click Resume Tester");
    await page.getByRole("button", { name: /Start Test/i }).click();

    await expect(page).toHaveURL(/\/questionnaire/);

    // Answer a few questions
    for (let i = 0; i < 3; i++) {
      await page
        .getByRole("button", { name: /3\s+Neutral/i })
        .nth(i)
        .click();
    }

    // Navigate to home page
    await page.goto("/");

    // Click resume
    await page.getByRole("link", { name: /Resume/i }).click();

    // Verify navigation to questionnaire
    await expect(page).toHaveURL(/\/questionnaire/);

    // Verify progress is restored (should be on question 4+)
    await expect(page.getByText(/Question 4/i)).toBeVisible();
  });

  test("should clear saved state when test is completed", async ({ page }) => {
    await page.goto("/test-selection");

    // Select Big-5
    await page.getByLabel(/Select Test Type/i).selectOption("big5");
    await page.getByPlaceholder(/Enter name/i).fill("Complete Tester");
    await page.getByRole("button", { name: /Start Test/i }).click();

    await expect(page).toHaveURL(/\/questionnaire/);

    // Answer all 50 questions
    for (let i = 0; i < 50; i++) {
      const indexInSet = i % 3;
      await page
        .getByRole("button", { name: /3\s+Neutral/i })
        .nth(indexInSet)
        .click();
    }

    await expect(page).toHaveURL(/\/results/);

    // Verify localStorage is cleared
    const savedSession = await page.evaluate((key) => {
      return localStorage.getItem(key);
    }, STORAGE_KEY);

    expect(savedSession).toBeNull();
  });

  test("should clear saved state when test is reset", async ({ page }) => {
    await page.goto("/test-selection");

    // Start a test
    await page.getByLabel(/Select Test Type/i).selectOption("big5");
    await page.getByPlaceholder(/Enter name/i).fill("Reset Tester");
    await page.getByRole("button", { name: /Start Test/i }).click();

    await expect(page).toHaveURL(/\/questionnaire/);

    // Answer a few questions
    for (let i = 0; i < 3; i++) {
      await page
        .getByRole("button", { name: /3\s+Neutral/i })
        .nth(i)
        .click();
    }

    // Verify session is saved
    let savedSession = await page.evaluate((key) => {
      return localStorage.getItem(key);
    }, STORAGE_KEY);
    expect(savedSession).not.toBeNull();

    // Start a new test (which should reset/replace the session)
    await page.goto("/test-selection");
    await page.getByLabel(/Select Test Type/i).selectOption("mbti");
    await page.getByPlaceholder(/Enter name/i).fill("New Tester");
    await page.getByRole("button", { name: /Start Test/i }).click();

    await expect(page).toHaveURL(/\/questionnaire/);

    // Verify the new session is saved
    savedSession = await page.evaluate((key) => {
      return localStorage.getItem(key);
    }, STORAGE_KEY);
    expect(savedSession).not.toBeNull();
    const parsed = JSON.parse(savedSession!);
    expect(parsed.authorName).toBe("New Tester");
    expect(parsed.testType).toBe("mbti");
  });

  test("should preserve answer order when resuming", async ({ page }) => {
    await page.goto("/test-selection");

    // Start a Big-5 test
    await page.getByLabel(/Select Test Type/i).selectOption("big5");
    await page.getByPlaceholder(/Enter name/i).fill("Order Tester");
    await page.getByRole("button", { name: /Start Test/i }).click();

    await expect(page).toHaveURL(/\/questionnaire/);

    // Answer first set (3 questions)
    for (let i = 0; i < 3; i++) {
      await page
        .getByRole("button", { name: /3\s+Neutral/i })
        .nth(i)
        .click();
    }

    // Get the current answer order from localStorage
    const beforeReload = await page.evaluate((key) => {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved).answerOrder : [];
    }, STORAGE_KEY);

    expect(beforeReload.length).toBe(3);

    // Reload the page
    await page.reload();
    await page.goto("/questionnaire");

    // Verify the answer order is preserved
    const afterReload = await page.evaluate((key) => {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved).answerOrder : [];
    }, STORAGE_KEY);

    expect(afterReload).toEqual(beforeReload);
  });
});

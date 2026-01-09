import { test, expect } from "@playwright/test";

test.describe("MBTI questionnaire flow", () => {
  test("should complete MBTI test and see results", async ({ page }) => {
    await page.goto("/test-selection");

    // Select MBTI
    await page.getByLabel(/Select Test Type/i).selectOption("mbti");
    await page.getByPlaceholder(/Enter name/i).fill("MBTI Tester");
    await page.getByRole("button", { name: /Start Test/i }).click();

    await expect(page).toHaveURL(/\/questionnaire/);

    // Answer all 60 questions (selecting "Slightly Agree" - value 4)
    for (let i = 0; i < 60; i++) {
      const indexInSet = i % 3;
      await page
        .getByRole("button", { name: /4\s+Slightly Agree/i })
        .nth(indexInSet)
        .click();
    }

    await expect(page).toHaveURL(/\/results/);
    await expect(
      page.getByRole("heading", { name: /Your Results/i })
    ).toBeVisible();
    await expect(page.getByText(/Prepared for MBTI Tester/i)).toBeVisible();

    // Verify MBTI type heading is present
    await expect(
      page.getByRole("heading", { name: /Myers-Briggs Type Indicator/i })
    ).toBeVisible();
  });
});

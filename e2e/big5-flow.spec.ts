import { test, expect } from "@playwright/test";

test.describe("Big-5 questionnaire flow", () => {
  test("should complete Big-5 test and see results", async ({ page }) => {
    await page.goto("/test-selection");

    // Select Big-5
    await page.getByLabel(/Select Test Type/i).selectOption("big5");
    await page.getByPlaceholder(/Enter name/i).fill("E2E Tester");
    await page.getByRole("button", { name: /Start Test/i }).click();

    await expect(page).toHaveURL(/\/questionnaire/);

    // Answer all 50 questions (selecting "Neutral" - value 3)
    for (let i = 0; i < 50; i++) {
      const indexInSet = i % 3;
      await page
        .getByRole("button", { name: /3\s+Neutral/i })
        .nth(indexInSet)
        .click();
    }

    await expect(page).toHaveURL(/\/results/);
    await expect(
      page.getByRole("heading", { name: /Your Results/i })
    ).toBeVisible();
    await expect(page.getByText(/Prepared for E2E Tester/i)).toBeVisible();
  });
});

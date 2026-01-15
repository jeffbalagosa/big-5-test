import { test, expect } from "@playwright/test";

test.describe("MBTI PDF export", () => {
  test("should export MBTI results as PDF", async ({ page }) => {
    await page.goto("/test-selection");

    // Select MBTI
    await page.getByLabel(/Select Test Type/i).selectOption("mbti");
    await page.getByPlaceholder(/Enter name/i).fill("MBTI PDF Tester");
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
    await expect(
      page.getByRole("heading", { name: /Myers-Briggs Type Indicator/i })
    ).toBeVisible();

    // Set up PDF download listener
    const downloadPromise = page.waitForEvent("download");

    // Click the Download PDF button
    await page.getByRole("button", { name: /Download PDF/i }).click();

    // Wait for the download and verify it's a PDF
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/);
    expect(download.suggestedFilename()).toContain("personality-report-mbti");
  });
});

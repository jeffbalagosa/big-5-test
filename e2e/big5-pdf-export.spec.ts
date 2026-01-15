import { test, expect } from "@playwright/test";

test.describe("Big-5 PDF export", () => {
  test("should export Big-5 results as PDF", async ({ page }) => {
    await page.goto("/test-selection");

    // Select Big-5
    await page.getByLabel(/Select Test Type/i).selectOption("big5");
    await page.getByPlaceholder(/Enter name/i).fill("PDF Export Tester");
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

    // Set up PDF download listener
    const downloadPromise = page.waitForEvent("download");

    // Click the Download PDF button
    await page.getByRole("button", { name: /Download PDF/i }).click();

    // Wait for the download and verify it's a PDF
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toMatch(/\.pdf$/);
    expect(download.suggestedFilename()).toContain("personality-report-big5");
  });
});

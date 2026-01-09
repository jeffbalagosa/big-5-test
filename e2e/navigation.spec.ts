import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("should load home page and navigate to test selection", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Discover You/);
    await expect(
      page.getByRole("heading", { name: "Discover You", level: 1 })
    ).toBeVisible();

    const startLink = page.getByRole("link", { name: /Start a Test/i });
    await startLink.click();

    await expect(page).toHaveURL(/\/test-selection/);
    await expect(
      page.getByRole("heading", { name: "Configure Your Test" })
    ).toBeVisible();
  });

  test("should navigate to about page via sidebar", async ({ page }) => {
    await page.goto("/");

    // Toggle sidebar if it's mobile or check if it's there
    const aboutLink = page.getByRole("link", { name: "About" });
    await aboutLink.click();

    await expect(page).toHaveURL(/\/about/);
    await expect(
      page.getByRole("heading", { name: "About the Project" })
    ).toBeVisible();
  });
});

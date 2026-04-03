import { test, expect } from "@playwright/test";
import { injectAuthToken } from "./helpers/authHelper";
import { mockVideos } from "./fixtures/mockData";

test.describe("Video Module", () => {
  test.beforeEach(async ({ page }) => {
    await injectAuthToken(page);

    await page.route("**/api/videos*", async (route) => {
      const url = new URL(route.request().url());
      const category = url.searchParams.get("category");
      const age = url.searchParams.get("age");

      let results = mockVideos;
      if (category) results = results.filter((v) => v.category === category);
      if (age)
        results = results.filter((v) => v.age_min <= Number(age) && v.age_max >= Number(age));

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(results),
      });
    });

    await page.route("**/api/videos/*/favorite", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });
  });

  test("home page displays videos grouped by category", async ({ page }) => {
    await page.goto("/home");

    await expect(page.getByRole("region", { name: /educational/i })).toBeVisible();
    await expect(page.getByRole("region", { name: /entertainment/i })).toBeVisible();
    await expect(page.getByRole("region", { name: /religious/i })).toBeVisible();
  });

  test("filtering by category updates the video list", async ({ page }) => {
    await page.goto("/videos");

    await page.getByRole("button", { name: "Educational" }).click();

    const videoCards = page.getByRole("article", { name: /video/i });
    await expect(videoCards).toHaveCount(1);
    await expect(videoCards.first()).toContainText("Learn the Alphabet");
  });

  test("filtering by age narrows the video list", async ({ page }) => {
    await page.goto("/videos");

    // age 5 should match videos with age_min<=5 and age_max>=5
    await page.getByRole("spinbutton", { name: /age/i }).fill("5");
    await page.getByRole("button", { name: /apply|filter/i }).click();

    const videoCards = page.getByRole("article", { name: /video/i });
    await expect(videoCards).toHaveCount(2); // alphabet (3-6) and animal songs (3-8)
  });

  test("parent can add a video to favorites", async ({ page }) => {
    await page.goto("/videos");

    // Icon button, using aria-label since it has no visible text
    await page
      .getByRole("button", { name: /add to favorites/i })
      .first()
      .click();

    await expect(page.getByRole("status")).toContainText(/added to favorites/i);
  });

  test("search returns relevant video results", async ({ page }) => {
    await page.route("**/api/videos/search*", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([mockVideos[0]]),
      });
    });

    await page.goto("/home");

    await page.getByRole("searchbox", { name: /search/i }).fill("alphabet");
    await page.keyboard.press("Enter");

    await expect(page.getByRole("article", { name: /video/i })).toHaveCount(1);
    await expect(page.getByText("Learn the Alphabet")).toBeVisible();
  });
});

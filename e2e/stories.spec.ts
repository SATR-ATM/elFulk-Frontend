import { test, expect } from "@playwright/test";
import { injectAuthToken } from "./helpers/authHelper";
import { mockStories, mockStoryContent } from "./fixtures/mockData";

test.describe("Stories Module", () => {
  test.beforeEach(async ({ page }) => {
    await injectAuthToken(page);

    await page.route("**/api/stories*", async (route) => {
      const url = new URL(route.request().url());
      const language = url.searchParams.get("language");
      const topic = url.searchParams.get("topic");
      const maxReadingTime = url.searchParams.get("max_reading_time");

      let results = mockStories;
      if (language) results = results.filter((s) => s.language === language);
      if (topic) results = results.filter((s) => s.topic === topic);
      if (maxReadingTime)
        results = results.filter((s) => s.reading_time_minutes <= Number(maxReadingTime));

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(results),
      });
    });

    await page.route("**/api/stories/uuid-story-1", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockStoryContent),
      });
    });
  });

  test("stories page lists stories with metadata", async ({ page }) => {
    await page.goto("/stories");

    const storyCards = page.getByRole("article", { name: /story/i });
    await expect(storyCards).toHaveCount(3);

    // Each card should show reading time and language from schema
    const firstCard = storyCards.first();
    await expect(firstCard.getByText(/min/i)).toBeVisible(); // reading_time_minutes
    await expect(firstCard.getByText(/ar|fr|en/i)).toBeVisible(); // language
  });

  test("filtering by language narrows the story list", async ({ page }) => {
    await page.goto("/stories");

    await page.getByRole("combobox", { name: /language/i }).selectOption("fr");

    await expect(page.getByRole("article", { name: /story/i })).toHaveCount(1);
    await expect(page.getByText("The Little Star")).toBeVisible();
  });

  test("filtering by topic narrows the story list", async ({ page }) => {
    await page.goto("/stories");

    await page.getByRole("combobox", { name: /topic/i }).selectOption("animals");

    await expect(page.getByRole("article", { name: /story/i })).toHaveCount(1);
    await expect(page.getByText("The Smart Fox")).toBeVisible();
  });

  test("filtering by reading time narrows the story list", async ({ page }) => {
    await page.goto("/stories");

    // Only stories with reading_time_minutes <= 5
    await page.getByRole("spinbutton", { name: /reading time/i }).fill("5");
    await page.getByRole("button", { name: /apply|filter/i }).click();

    const results = page.getByRole("article", { name: /story/i });
    await expect(results).toHaveCount(2); // fox (5min) and star (3min)
  });

  test("opening a story shows formatted text and images", async ({ page }) => {
    await page.goto("/stories");

    await page.getByRole("article", { name: /story/i }).first().click();

    await expect(page).toHaveURL(/\/stories\/uuid-story-1/);

    // Formatted paragraphs
    await expect(page.getByRole("main")).toContainText("Once upon a time");

    // Embedded image, use alt text per your instruction
    await expect(page.getByRole("img", { name: /fox/i })).toBeVisible();
  });
});

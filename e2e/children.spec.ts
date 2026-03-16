import { test, expect } from "@playwright/test";
import { injectAuthToken } from "./helpers/authHelper";
import { mockChildren, mockAccessPolicy } from "./fixtures/mockData";

test.describe("Child Profile Management", () => {
  test.beforeEach(async ({ page }) => {
    await injectAuthToken(page);

    await page.route("**/api/children", async (route) => {
      if (route.request().method() === "GET") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(mockChildren),
        });
      } else if (route.request().method() === "POST") {
        const body = route.request().postDataJSON();
        await route.fulfill({
          status: 201,
          contentType: "application/json",
          body: JSON.stringify({ id: "uuid-child-new", parent_id: "uuid-parent-1", ...body }),
        });
      }
    });

    await page.route("**/api/children/*/access-policy", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockAccessPolicy),
      });
    });
  });

  test("parent can see existing child profiles", async ({ page }) => {
    await page.goto("/settings/children");

    await expect(page.getByRole("heading", { name: "Ahmed" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Sara" })).toBeVisible();
  });

  test("parent can create a new child profile", async ({ page }) => {
    await page.goto("/settings/children");

    await page.getByRole("button", { name: /add child|new profile/i }).click();

    await page.getByLabel("Child name").fill("Youssef");
    await page.getByLabel("Date of birth").fill("2018-05-14");

    await page.getByRole("button", { name: "Save" }).click();

    await expect(page.getByRole("status")).toContainText(/created|saved|success/i);
  });

  test("parent can configure content permissions for a child", async ({ page }) => {
    await page.goto("/settings/children/uuid-child-1/permissions");

    // max_age_rating from ACCESS_POLICY schema
    const ageRatingSelect = page.getByRole("combobox", { name: /age rating|content level/i });
    await ageRatingSelect.selectOption("10");

    await page.getByRole("button", { name: "Save permissions" }).click();

    await expect(page.getByRole("status")).toContainText(/saved|updated/i);
  });

  test("parent settings are protected by password prompt", async ({ page }) => {
    await page.goto("/settings/children");

    await page
      .getByRole("button", { name: /settings|configure/i })
      .first()
      .click();

    // Should require PIN/password based on lock_enabled in ACCESS_POLICY
    await expect(page.getByRole("dialog", { name: /enter password|confirm pin/i })).toBeVisible();
  });
});

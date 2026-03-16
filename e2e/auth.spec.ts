import { test, expect } from "@playwright/test";
import { mockAuthRoutes } from "./helpers/authHelper";

test.describe("Authentication", () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthRoutes(page);
  });

  test("parent can register with email and is redirected to home", async ({ page }) => {
    await page.goto("/register");

    await page.getByLabel("Username").fill("new_parent");
    await page.getByLabel("Email").fill("parent@elfoulk.com");
    await page.getByLabel("Password").fill("SecurePass123");

    await page.getByRole("button", { name: "Create account" }).click();

    await expect(page).toHaveURL("/home");
  });

  test("parent can log in with valid credentials", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("Email").fill("parent@elfoulk.com");
    await page.getByLabel("Password").fill("SecurePass123");

    await page.getByRole("button", { name: "Log in" }).click();

    await expect(page).toHaveURL("/home");
  });

  test("shows error message on invalid credentials", async ({ page }) => {
    // Override to simulate failed login
    await page.route("**/api/auth/login", async (route) => {
      await route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({ message: "Invalid credentials" }),
      });
    });

    await page.goto("/login");

    await page.getByLabel("Email").fill("wrong@email.com");
    await page.getByLabel("Password").fill("wrongpassword");
    await page.getByRole("button", { name: "Log in" }).click();

    await expect(page.getByRole("alert")).toBeVisible();
    await expect(page).not.toHaveURL("/home");
  });

  test("onboarding tour is shown on first login", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Email").fill("parent@elfoulk.com");
    await page.getByLabel("Password").fill("SecurePass123");
    await page.getByRole("button", { name: "Log in" }).click();

    // Onboarding dialog should be visible for first-time users
    await expect(page.getByRole("dialog", { name: /welcome|tour|get started/i })).toBeVisible();
  });

  test("unauthenticated user is redirected to login", async ({ page }) => {
    await page.goto("/home");
    await expect(page).toHaveURL("/login");
  });
});

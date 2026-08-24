import { test, expect } from "@playwright/test";
import { mockAuthRoutes } from "./helpers/authHelper";

test.describe("Parent Authentication & Accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthRoutes(page);
  });

  test("parent can register with valid fields and is redirected to /verify-email", async ({
    page,
  }) => {
    await page.goto("/register");

    // Fill registration form — simplified fields matching Figma
    await page.getByLabel("الاسم", { exact: true }).fill("أحمد");
    await page.getByLabel("اللقب", { exact: true }).fill("محمد");
    await page.getByLabel("البريد الإلكتروني", { exact: true }).fill("parent@elfoulk.com");
    await page.getByLabel("كلمة المرور", { exact: true }).fill("SecurePass123");
    await page.getByLabel("الموافقة على شروط الاستخدام وسياسة الخصوصية").check();

    // Click submit button
    await page.getByLabel("إنشاء حساب جديد").click();

    // Verify redirected to /verify-email
    await expect(page).toHaveURL(/\/verify-email/);
  });

  test("shows validation errors on empty register form submit", async ({ page }) => {
    await page.goto("/register");

    // Submit empty form
    await page.getByLabel("إنشاء حساب جديد").click();

    // Expect inline validation alerts to be visible
    await expect(page.getByText("الاسم مطلوب")).toBeVisible();
    await expect(page.getByText("اللقب مطلوب")).toBeVisible();
    await expect(page.getByText("البريد الإلكتروني مطلوب")).toBeVisible();
    await expect(page.getByText("يجب أن تتكون كلمة المرور من 8 أحرف على الأقل")).toBeVisible();
  });

  test("parent can log in with valid credentials and is redirected to /dashboard", async ({
    page,
  }) => {
    await page.goto("/login");

    await page.getByLabel("البريد الإلكتروني", { exact: true }).fill("parent@elfoulk.com");
    await page.getByLabel("كلمة المرور", { exact: true }).fill("SecurePass123");

    await page.getByLabel("تسجيل الدخول إلى حسابك").click();

    await expect(page).toHaveURL(/\/dashboard/);
  });

  test("shows error message on invalid login credentials", async ({ page }) => {
    await page.route("**/api/auth/login", async (route) => {
      await route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({ message: "Invalid credentials" }),
      });
    });
    await page.goto("/login");

    await page.getByLabel("البريد الإلكتروني", { exact: true }).fill("wrong@email.com");
    await page.getByLabel("كلمة المرور", { exact: true }).fill("wrongpassword");
    await page.getByLabel("تسجيل الدخول إلى حسابك").click();

    await expect(page.locator("#auth-error-alert")).toBeVisible();
    await expect(page).not.toHaveURL(/\/dashboard/);
  });

  test("password visibility toggle switches input type and aria-label", async ({ page }) => {
    await page.goto("/login");

    const passwordInput = page.getByLabel("كلمة المرور", { exact: true });
    await expect(passwordInput).toHaveAttribute("type", "password");

    const toggleBtn = page.getByLabel("إظهار كلمة المرور");
    await toggleBtn.click();

    await expect(passwordInput).toHaveAttribute("type", "text");
    await expect(page.getByLabel("إخفاء كلمة المرور")).toBeVisible();
  });

  test("side hero carousel slides can be navigated via accessible buttons", async ({ page }) => {
    // Only visible on desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/login");

    // Slide 1: عالم آمن يبدأ من هنا
    await expect(page.getByText("عالم آمن يبدأ من هنا")).toBeVisible();

    // Navigate to slide 2: أنت من يقرر، دائمًا
    const nextBtn = page.getByLabel("الشريحة التالية");
    await nextBtn.click();
    await expect(page.getByText("أنت من يقرر، دائمًا")).toBeVisible();

    // Navigate to slide 3 (last): تعلّم، العب، اكتشف
    await nextBtn.click();
    await expect(page.getByText("تعلّم، العب، اكتشف")).toBeVisible();
  });
});

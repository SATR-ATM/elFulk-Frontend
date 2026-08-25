import { test, expect } from "@playwright/test";
import { mockAuthRoutes } from "./helpers/authHelper";

test.describe("Login", () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthRoutes(page);
  });

  test("valid credentials redirect to /dashboard", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("email-input").fill("parent@elfoulk.com");
    await page.getByLabel("password-input").fill("SecurePass123!");
    await page.getByLabel("login-submit").click();
    await expect(page).toHaveURL("/dashboard");
  });

  test("invalid credentials show error alert, stay on /login", async ({ page }) => {
    await page.route("**/api/auth/sign-in/email", (route) =>
      route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({ message: "Invalid credentials" }),
      })
    );
    await page.goto("/login");
    await page.getByLabel("email-input").fill("wrong@email.com");
    await page.getByLabel("password-input").fill("wrongpassword");
    await page.getByLabel("login-submit").click();
    await expect(page.getByRole("alert")).toBeVisible();
    await expect(page).toHaveURL("/login");
  });

  test("empty form shows inline validation errors without calling API", async ({ page }) => {
    let apiCalled = false;
    await page.route("**/api/auth/sign-in/email", () => {
      apiCalled = true;
    });
    await page.goto("/login");
    await page.getByLabel("login-submit").click();
    expect(apiCalled).toBe(false);
    await expect(page.locator("[aria-invalid='true']").first()).toBeVisible();
  });

  test("password toggle switches input type", async ({ page }) => {
    await page.goto("/login");
    const input = page.getByLabel("password-input");
    await input.fill("SecurePass123!");
    await expect(input).toHaveAttribute("type", "password");
    await page.getByLabel("password-toggle").click();
    await expect(input).toHaveAttribute("type", "text");
    await page.getByLabel("password-toggle").click();
    await expect(input).toHaveAttribute("type", "password");
  });

  test("forgot password link navigates to /forgot-password", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("forgot-password-link").click();
    await expect(page).toHaveURL("/forgot-password");
  });

  test.fixme("social login buttons are visible but do not call any API", async ({ page }) => {
    let called = false;
    await page.route("**/api/auth/**", () => {
      called = true;
    });
    await page.goto("/login");
    await expect(page.getByLabel("google-login")).toBeVisible();
    await expect(page.getByLabel("apple-login")).toBeVisible();
    await page.getByLabel("google-login").click();
    await page.getByLabel("apple-login").click();
    expect(called).toBe(false);
  });

  test("unauthenticated user visiting /dashboard is redirected to /login", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL("/login");
  });
});

test.describe("Register", () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthRoutes(page);
  });

  test("valid registration calls sign-up + user creation then redirects to /verify-email", async ({
    page,
  }) => {
    let signUpCalled = false;
    let userCreationCalled = false;
    await page.route("**/api/auth/sign-up/email", (route) => {
      signUpCalled = true;
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ user: { id: "uuid-1" } }),
      });
    });
    await page.route("**/api/v1/users", (route) => {
      userCreationCalled = true;
      route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({
          id: "uuid-1",
          first_name: "Amina",
          last_name: "Bensalem",
          type: "parent",
        }),
      });
    });
    await page.goto("/register");
    await page.getByLabel("first-name-input").fill("Amina");
    await page.getByLabel("last-name-input").fill("Bensalem");
    await page.getByLabel("email-input").fill("parent@elfoulk.com");
    await page.getByLabel("password-input").fill("SecurePass123!");
    await page.getByLabel("terms-checkbox").check();
    await page.getByLabel("register-submit").click();
    expect(signUpCalled).toBe(true);
    expect(userCreationCalled).toBe(true);
    await expect(page).toHaveURL("/verify-email");
  });

  test("empty form shows inline errors without calling API", async ({ page }) => {
    let apiCalled = false;
    await page.route("**/api/auth/sign-up/email", () => {
      apiCalled = true;
    });
    await page.goto("/register");
    await page.getByLabel("register-submit").click();
    expect(apiCalled).toBe(false);
    // assert Arabic validation messages from Zod schema
    await expect(page.getByText("الاسم مطلوب")).toBeVisible();
    await expect(page.getByText("اللقب مطلوب")).toBeVisible();
    await expect(page.getByText("البريد الإلكتروني مطلوب")).toBeVisible();
    await expect(page.getByText("يجب أن تتكون كلمة المرور من 8 أحرف على الأقل")).toBeVisible();
  });

  test("mismatched passwords show inline error without calling API", async ({ page }) => {
    let apiCalled = false;
    await page.route("**/api/auth/sign-up/email", () => {
      apiCalled = true;
    });
    await page.goto("/register");
    await page.getByLabel("first-name-input").fill("Amina");
    await page.getByLabel("last-name-input").fill("Bensalem");
    await page.getByLabel("email-input").fill("parent@elfoulk.com");
    await page.getByLabel("password-input").fill("SecurePass123!");
    await page.getByLabel("confirm-password-input").fill("DifferentPass!");
    await page.getByLabel("terms-checkbox").check();
    await page.getByLabel("register-submit").click();
    expect(apiCalled).toBe(false);
    await expect(page.getByText(/كلمات المرور غير متطابقة/i)).toBeVisible();
    await expect(page).toHaveURL("/register");
  });

  test("unchecked T&C prevents submission", async ({ page }) => {
    let apiCalled = false;
    await page.route("**/api/auth/sign-up/email", () => {
      apiCalled = true;
    });
    await page.goto("/register");
    await page.getByLabel("first-name-input").fill("Amina");
    await page.getByLabel("last-name-input").fill("Bensalem");
    await page.getByLabel("email-input").fill("parent@elfoulk.com");
    await page.getByLabel("password-input").fill("SecurePass123!");
    await page.getByLabel("terms-checkbox").uncheck();
    // intentionally skip terms-checkbox
    await page.getByLabel("register-submit").click();
    expect(apiCalled).toBe(false);
    await expect(page).toHaveURL("/register");
  });

  test("already have an account link navigates to /login", async ({ page }) => {
    await page.goto("/register");
    await page.getByLabel("login-link").click();
    await expect(page).toHaveURL("/login");
  });
});

test.describe("Verify email", () => {
  test("page renders OTP inputs and resend button", async ({ page }) => {
    await page.goto("/verify-email");
    const inputs = page.locator("[aria-label^='otp-digit']");
    const count = await inputs.count();
    if (count === 5) {
      await expect(inputs.first()).toBeVisible();
    } else {
      await expect(page.getByLabel("otp-input")).toBeVisible();
    }
    await expect(page.getByLabel("resend-otp")).toBeVisible();
  });

  test("resend button is disabled during countdown", async ({ page }) => {
    await page.goto("/verify-email");
    await expect(page.getByLabel("resend-otp")).toBeDisabled();
    await expect(page.getByText(/\d+s|\d+ ثانية/i)).toBeVisible();
  });

  test("resend button calls send-verification-email after countdown", async ({ page }) => {
    let resendCalled = false;
    await page.route("**/api/auth/send-verification-email", (route) => {
      resendCalled = true;
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Email sent" }),
      });
    });
    await page.goto("/verify-email");
    await page.clock.fastForward(60_000);
    await expect(page.getByLabel("resend-otp")).toBeEnabled();
    await page.getByLabel("resend-otp").click();
    expect(resendCalled).toBe(true);
  });
});

test.describe("Forgot password", () => {
  test("page renders email field and back to login link", async ({ page }) => {
    await page.goto("/forgot-password");
    await expect(page.getByLabel("email-input")).toBeVisible();
    await expect(page.getByLabel("back-to-login")).toBeVisible();
  });

  test("empty email shows validation error without calling API", async ({ page }) => {
    let apiCalled = false;
    await page.route("**/api/auth/forget-password", () => {
      apiCalled = true;
    });
    await page.goto("/forgot-password");
    await page.getByLabel("forgot-password-submit").click();
    expect(apiCalled).toBe(false);
    await expect(page.locator("[aria-invalid='true']")).toBeVisible();
  });

  test("invalid email format shows validation error without calling API", async ({ page }) => {
    let apiCalled = false;
    await page.route("**/api/auth/forget-password", () => {
      apiCalled = true;
    });
    await page.goto("/forgot-password");
    await page.getByLabel("email-input").fill("not-an-email");
    await page.getByLabel("forgot-password-submit").click();
    expect(apiCalled).toBe(false);
    await expect(page.locator("[aria-invalid='true']")).toBeVisible();
  });

  test("valid email shows success message regardless of whether email exists", async ({ page }) => {
    await page.route("**/api/auth/forget-password", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ message: "Email sent" }),
      })
    );
    await page.goto("/forgot-password");
    await page.getByLabel("email-input").fill("parent@elfoulk.com");
    await page.getByLabel("forgot-password-submit").click();
    await expect(
      page.getByText(/تحقق من بريدك الإلكتروني|تفقد بريدك الالكتروني|تم إرسال الرابط/i)
    ).toBeVisible();
  });

  test("back to login link navigates to /login", async ({ page }) => {
    await page.goto("/forgot-password");
    await page.getByLabel("back-to-login").click();
    await expect(page).toHaveURL("/login");
  });
});

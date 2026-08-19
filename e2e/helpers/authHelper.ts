import { Page } from "@playwright/test";
import { mockParent } from "../fixtures/mockData";

export async function mockAuthRoutes(page: Page) {
  // BetterAuth sign-in
  await page.route("**/api/auth/sign-in/email", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        token: "mock-jwt",
        user: { id: mockParent.id, email: mockParent.email },
      }),
    })
  );
  // BetterAuth sign-up
  await page.route("**/api/auth/sign-up/email", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ user: { id: mockParent.id, email: mockParent.email } }),
    })
  );
  // NestJS user profile creation
  await page.route("**/api/v1/users", (route) =>
    route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({
        id: mockParent.id,
        first_name: mockParent.first_name,
        last_name: mockParent.last_name,
        type: mockParent.type,
      }),
    })
  );
  // BetterAuth resend verification
  await page.route("**/api/auth/send-verification-email", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ message: "Email sent" }),
    })
  );
  // BetterAuth forgot password
  await page.route("**/api/auth/forget-password", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ message: "Email sent" }),
    })
  );
}

//? If we are going to use BetterAuth, and we should.
export async function injectAuthToken(page: Page) {
  // Inject the session-token
  await page.context().addCookies([
    {
      name: "better-auth.session_token",
      value: "mock-session-token-value",
      domain: "localhost",
      path: "/",
      httpOnly: true,
      secure: false, //! true only in production
      sameSite: "Lax", // BetterAuth default
    },
  ]);

  // Mocking the session endpoint so the app gets valid user data back
  await page.route("**/api/auth/get-session", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        session: {
          id: "mock-session-id",
          userId: mockParent.id,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
        user: mockParent,
      }),
    });
  });
}

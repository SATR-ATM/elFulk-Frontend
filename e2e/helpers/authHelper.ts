import { Page } from "@playwright/test";
import { mockToken, mockParent } from "../fixtures/mockData";

export async function mockAuthRoutes(page: Page) {
  await page.route("**/api/auth/login", async (route) => {
    const body = route.request().postDataJSON();
    if (body?.email && body?.password) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ ...mockToken, parent: mockParent }),
      });
    } else {
      await route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({ message: "Invalid credentials" }),
      });
    }
  });

  await page.route("**/api/auth/register", async (route) => {
    await route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({ ...mockToken, parent: mockParent }),
    });
  });
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

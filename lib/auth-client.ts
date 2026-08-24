import { LoginFormValues, RegisterFormValues, VerifyEmailFormValues } from "@/schemas/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export interface AuthResponse<T = unknown> {
  ok: boolean;
  status: number;
  data?: T;
  message?: string;
}

async function handleResponse<T>(res: Response): Promise<AuthResponse<T>> {
  let json: unknown = null;
  try {
    json = await res.json();
  } catch {
    json = null;
  }

  if (!res.ok) {
    const errMessage =
      typeof json === "object" && json !== null && "message" in json
        ? String((json as { message: unknown }).message)
        : undefined;
    return { ok: false, status: res.status, message: errMessage };
  }

  return { ok: true, status: res.status, data: json as T };
}

/**
 * Auth Client Adapter
 * Centralizes all authentication requests for easy configuration with NestJS / Better Auth backend.
 */
export const authClient = {
  async login(credentials: LoginFormValues): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return handleResponse(res);
  },

  async register(data: RegisterFormValues): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse(res);
  },

  async verifyEmail(payload: VerifyEmailFormValues): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE_URL}/api/auth/verify-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: payload.code }),
    });
    return handleResponse(res);
  },

  async forgotPassword(email: string): Promise<AuthResponse> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.status === 404) {
        // Mock fallback when backend route isn't running
        return { ok: true, status: 200 };
      }
      return handleResponse(res);
    } catch {
      // Mock fallback for offline/development mode
      return { ok: true, status: 200 };
    }
  },
};

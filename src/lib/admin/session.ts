import type { LoginResponse } from "@/types/api";

export const ADMIN_SESSION_STORAGE_KEY = "mono256.admin.session";

export type StoredAdminSession = Pick<
  LoginResponse,
  "accessToken" | "tokenType" | "expiresIn" | "user"
>;

export function readStoredAdminSession(): StoredAdminSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(ADMIN_SESSION_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue) as StoredAdminSession;
  } catch {
    window.localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
    return null;
  }
}

export function writeStoredAdminSession(session: StoredAdminSession) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    ADMIN_SESSION_STORAGE_KEY,
    JSON.stringify(session)
  );
}

export function clearStoredAdminSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(ADMIN_SESSION_STORAGE_KEY);
}

import { apiClient } from "@/lib/api/client";
import type { LoginRequest, LoginResponse, MeResponse } from "@/types/api";

export function loginAdmin(payload: LoginRequest) {
  return apiClient<LoginResponse, LoginRequest>("/auth/login", {
    method: "POST",
    body: payload,
  });
}

export function fetchCurrentAdminUser(authToken: string) {
  return apiClient<MeResponse>("/auth/me", {
    method: "GET",
    cache: "no-store",
    authToken,
  });
}

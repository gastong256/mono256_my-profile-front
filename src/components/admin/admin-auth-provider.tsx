"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { fetchCurrentAdminUser, loginAdmin } from "@/lib/api/auth";
import { clearStoredAdminSession, readStoredAdminSession, writeStoredAdminSession } from "@/lib/admin/session";
import type { AuthUser, LoginRequest, LoginResponse } from "@/types/api";

type AdminAuthStatus = "loading" | "authenticated" | "unauthenticated";

type AdminAuthContextValue = {
  status: AdminAuthStatus;
  user: AuthUser | null;
  accessToken: string | null;
  login: (payload: LoginRequest) => Promise<LoginResponse>;
  logout: () => void;
  refresh: () => Promise<void>;
};

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

function getSessionState() {
  return {
    status: "unauthenticated" as const,
    user: null,
    accessToken: null
  };
}

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AdminAuthStatus>("loading");
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function bootstrapSession() {
      const storedSession = readStoredAdminSession();

      if (!storedSession) {
        if (isMounted) {
          setStatus("unauthenticated");
        }

        return;
      }

      try {
        const response = await fetchCurrentAdminUser(storedSession.accessToken);

        if (!isMounted) {
          return;
        }

        setUser(response.user);
        setAccessToken(storedSession.accessToken);
        setStatus("authenticated");
      } catch {
        clearStoredAdminSession();

        if (!isMounted) {
          return;
        }

        const nextState = getSessionState();
        setUser(nextState.user);
        setAccessToken(nextState.accessToken);
        setStatus(nextState.status);
      }
    }

    void bootstrapSession();

    return () => {
      isMounted = false;
    };
  }, []);

  async function login(payload: LoginRequest) {
    const response = await loginAdmin(payload);
    writeStoredAdminSession({
      accessToken: response.accessToken,
      tokenType: response.tokenType,
      expiresIn: response.expiresIn,
      user: response.user
    });
    setUser(response.user);
    setAccessToken(response.accessToken);
    setStatus("authenticated");
    return response;
  }

  function logout() {
    clearStoredAdminSession();
    const nextState = getSessionState();
    setUser(nextState.user);
    setAccessToken(nextState.accessToken);
    setStatus(nextState.status);
  }

  async function refresh() {
    if (!accessToken) {
      logout();
      return;
    }

    try {
      const response = await fetchCurrentAdminUser(accessToken);
      setUser(response.user);
      setStatus("authenticated");
    } catch {
      logout();
    }
  }

  return (
    <AdminAuthContext.Provider
      value={{
        status,
        user,
        accessToken,
        login,
        logout,
        refresh
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const value = useContext(AdminAuthContext);

  if (!value) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }

  return value;
}

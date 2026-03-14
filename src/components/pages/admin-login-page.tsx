"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useAdminAuth } from "@/components/admin/admin-auth-provider";
import { windowBodyResetClass } from "@/components/shared/window/foundation";
import { WindowPageShell } from "@/components/shared/window/window-page-shell";
import { ApiError } from "@/lib/api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function buildLoginErrorMessage(error: unknown) {
  if (error instanceof ApiError) {
    if (error.status === 401) {
      return "Invalid email or password.";
    }

    if (error.status === 429) {
      return "Too many login attempts. Please wait a moment and try again.";
    }

    if (error.status === 503) {
      return "The authentication service is temporarily unavailable.";
    }
  }

  return "The login request could not be completed.";
}

export function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedNextPath = searchParams.get("next");
  const nextPath = requestedNextPath?.startsWith("/admin") ? requestedNextPath : "/admin";
  const { login, status } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(nextPath);
    }
  }, [nextPath, router, status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await login({
        email: email.trim(),
        password
      });
      router.replace(nextPath);
    } catch (error) {
      setErrorMessage(buildLoginErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <WindowPageShell
      title="Admin.login"
      subtitle="Restricted"
      status="interactive"
      windowBodyClassName={windowBodyResetClass}
      help={{
        section: "Admin Login",
        path: "~/admin/login",
        items: ["Authenticate with backend credentials to open the private submissions dashboard."]
      }}
    >
      <section className="flex min-h-[640px] items-center justify-center bg-[linear-gradient(180deg,#18243b_0%,#1c3456_30%,#2f4f73_100%)] p-6">
        <div className="w-full max-w-md rounded-2xl border border-border/80 bg-surface/95 p-6 shadow-card">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/55">Private route</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Admin access</h1>
          <p className="mt-2 text-sm text-foreground/72">
            Sign in with backend admin credentials. This route is intentionally hidden from public navigation.
          </p>

          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground/88">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                maxLength={320}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground/88">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            <div aria-live="polite" className="min-h-5 text-sm font-medium text-[#f0c674]">
              {errorMessage}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting || status === "loading"}>
              {isSubmitting ? "Signing in..." : status === "loading" ? "Checking session..." : "Sign in"}
            </Button>
          </form>
        </div>
      </section>
    </WindowPageShell>
  );
}

import { Suspense } from "react";
import type { Metadata } from "next";

import { AdminRouteFallback } from "@/components/admin/admin-route-fallback";
import { AdminLoginPage } from "@/components/pages/admin-login-page";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginRoutePage() {
  return (
    <Suspense fallback={<AdminRouteFallback title="Admin.login" />}>
      <AdminLoginPage />
    </Suspense>
  );
}

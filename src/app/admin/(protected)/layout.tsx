import { Suspense } from "react";

import { AdminAuthGuard } from "@/components/admin/admin-auth-guard";
import { AdminRouteFallback } from "@/components/admin/admin-route-fallback";

export default function AdminProtectedLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<AdminRouteFallback title="Admin.secure" />}>
      <AdminAuthGuard>{children}</AdminAuthGuard>
    </Suspense>
  );
}

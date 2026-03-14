import type { Metadata } from "next";

import { AdminAuthProvider } from "@/components/admin/admin-auth-provider";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}

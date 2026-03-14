import type { Metadata } from "next";

import { AdminPage } from "@/components/pages/admin-page";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminRoutePage() {
  return <AdminPage />;
}

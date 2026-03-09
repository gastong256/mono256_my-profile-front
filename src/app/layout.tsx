import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { defaultMetadata } from "@/lib/metadata";

import "./globals.css";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex h-full flex-col overflow-hidden font-sans antialiased">
        <SiteHeader />
        <main className="min-h-0 flex-1 overflow-hidden">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

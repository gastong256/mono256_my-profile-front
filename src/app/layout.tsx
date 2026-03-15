import type { Metadata } from "next";

import { HeaderUiProvider } from "@/components/layout/header-ui-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SystemToastProvider } from "@/components/shared/system/system-toast-provider";
import { defaultMetadata } from "@/lib/metadata";

import "./globals.css";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-screen flex-col overflow-x-hidden font-sans antialiased md:h-full md:overflow-hidden">
        <HeaderUiProvider>
          <SystemToastProvider>
            <SiteHeader />
            <main className="flex-1 md:min-h-0 md:overflow-hidden">
              {children}
            </main>
            <SiteFooter />
          </SystemToastProvider>
        </HeaderUiProvider>
      </body>
    </html>
  );
}

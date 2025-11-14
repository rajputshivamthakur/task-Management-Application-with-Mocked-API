import type { Metadata } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";
import ReduxProvider from "@/components/providers/ReduxProvider";
import MSWProvider from "@/components/providers/MSWProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Task Manager - Manage Your Tasks Efficiently",
  description: "A complete task management application with authentication, CRUD operations, and dark mode support",
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        <ReduxProvider>
          <ThemeProvider>
            <MSWProvider>
              {children}
            </MSWProvider>
          </ThemeProvider>
        </ReduxProvider>
        <Toaster />
      </body>
    </html>
  );
}
import "./globals.scss";
import type { Metadata } from "next";
import { CarbonThemeProvider } from "@/contexts/carbonThemeProvider";
import { ReduxProvider } from "../store/ReduxProvider";
import { ToastProvider } from "@/contexts/ToastContext";

export const metadata: Metadata = {
  title: "Carbon Cloud Monitoring Portal",
  description: "Carbon Cloud Monitoring Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ReduxProvider>
          <CarbonThemeProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </CarbonThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

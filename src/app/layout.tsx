import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Shell } from "@/components/layout/Shell";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} | Cincinnati Bengals`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_TAGLINE,
  keywords: ["Cincinnati Bengals", "WHO DEY", "NFL", "Bengals score", "Paycor Stadium"],
  openGraph: {
    title: APP_NAME,
    description: APP_TAGLINE,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FB4F14",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen antialiased">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}

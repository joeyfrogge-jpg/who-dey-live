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
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: APP_NAME,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
    { media: "(prefers-color-scheme: light)", color: "#FB4F14" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="min-h-dvh antialiased touch-manipulation">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Shell } from "@/components/layout/Shell";
import { ThemeAudio } from "@/components/audio/ThemeAudio";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: `${APP_NAME} | Cincinnati Bengals`,
    template: `%s | ${APP_NAME}`,
  },
  description: APP_TAGLINE,
  keywords: [
    "Cincinnati Bengals",
    "WHO DEY",
    "WHO DEY LIVE",
    "NFL",
    "Bengals score",
    "Paycor Stadium",
    "live game",
    "Bengals app",
  ],
  applicationName: APP_NAME,
  authors: [{ name: "WHO DEY LIVE" }],
  creator: "WHO DEY LIVE",
  publisher: "WHO DEY LIVE",
  openGraph: {
    title: APP_NAME,
    description: APP_TAGLINE,
    type: "website",
    siteName: APP_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: APP_NAME,
    description: APP_TAGLINE,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": APP_NAME,
  },
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
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* iOS PWA & standalone mode */}
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content={APP_NAME} />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#FB4F14" />
        <meta name="msapplication-TileColor" content="#FB4F14" />

        {/* Apple touch icons (Bengals logo as primary) */}
        <link
          rel="apple-touch-icon"
          href="https://a.espncdn.com/i/teamlogos/nfl/500/cin.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://a.espncdn.com/i/teamlogos/nfl/500/cin.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="https://a.espncdn.com/i/teamlogos/nfl/500/cin.png"
        />

        {/* Prevent phone number detection & unwanted formatting */}
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="min-h-dvh antialiased touch-manipulation overscroll-none">
        <ThemeAudio />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}

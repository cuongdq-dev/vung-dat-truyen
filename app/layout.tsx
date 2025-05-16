import { Header } from "@/components/header";
import { Nav } from "@/components/nav";
import { ThemeProvider } from "@/components/theme-provider";
import { SettingProvider } from "@/context/SettingProvider";
import { getSiteSetting } from "@/lib/api";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import type React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vùng Đất Truyện - Your Digital Reading Companion",
  description: "Discover, read, and track your favorite books in one place",
  keywords: "books, reading, digital library, ebooks",
  openGraph: {
    title: "Vùng Đất Truyện - Your Digital Reading Companion",
    description: "Discover, read, and track your favorite books in one place",
    type: "website",
  },
};

const googleSiteVerification = process.env.SITE_GOOGLE_SITE_VERIFICATION;
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSetting = await getSiteSetting();
  return (
    <SettingProvider value={siteSetting || { adsense: {}, categories: [] }}>
      <html lang="en" suppressHydrationWarning>
        <head>
          {siteSetting?.adsense?.adsense_client && (
            <Script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${siteSetting?.adsense?.adsense_client}`}
              crossOrigin="anonymous"
              strategy="afterInteractive"
            />
          )}
          {googleSiteVerification && (
            <meta
              name="google-site-verification"
              content={googleSiteVerification}
            />
          )}
        </head>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />

            <main>
              <div className="w-full lg:max-w-[70%] mx-auto pb-16">
                <div className="mb-10">{children}</div>
                <Nav />
              </div>
            </main>
          </ThemeProvider>
        </body>
      </html>
    </SettingProvider>
  );
}

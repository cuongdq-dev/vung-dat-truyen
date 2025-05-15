import { Header } from "@/components/header";
import { Nav } from "@/components/nav";
import { ThemeProvider } from "@/components/theme-provider";
import { CategoriesProvider } from "@/context/CategoriesProvider";
import { getCategories } from "@/lib/api";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
  generator: "v0.dev",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <CategoriesProvider value={categories || []}>
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
        </CategoriesProvider>
      </body>
    </html>
  );
}

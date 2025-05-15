import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import type React from "react";
import "./globals.css";
import { BookOpen } from "lucide-react";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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

              <nav className="z-[100] fixed bottom-0 left-0 right-0 bg-background border-t border-border flex justify-around py-2">
                <Link
                  href="/"
                  className="flex flex-col items-center p-2 text-primary w-[100%]"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-xs mt-1">Vùng Đất Truyện</span>
                </Link>

                <Link
                  href="/books/danh-muc"
                  className="flex flex-col items-center p-2 w-[100%]"
                >
                  <BookOpen className="h-6 w-6 mr-1" />
                  <span className="text-xs mt-1">Danh Mục</span>
                </Link>

                <Link
                  href="/bookmark"
                  className="flex flex-col items-center p-2 w-[100%]"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-xs mt-1">Bookmark</span>
                </Link>
              </nav>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

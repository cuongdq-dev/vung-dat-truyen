// "use client";
import { AdsenseUnit } from "@/components/ads/ad-unit";
import { BookGrid } from "@/components/book-grid";
import { Categories } from "@/components/categories";
import { FeaturedBook } from "@/components/featured-book";
import { Button } from "@/components/ui/button";
import { useSetting } from "@/context/SettingContext";
import { getHome } from "@/lib/api";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const homeResponse = await getHome();

  return (
    <>
      <div className="container py-4 px-4">
        {homeResponse?.home?.top && (
          <FeaturedBook book={homeResponse?.home?.top} />
        )}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Truyện Đề Xuất</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/books" className="flex items-center gap-1">
                Xem tất cả
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          {homeResponse?.home?.featureBooks && (
            <BookGrid books={homeResponse?.home?.featureBooks} />
          )}
        </div>
        <div className="mt-12">
          <AdsenseUnit />
        </div>

        <Categories />

        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Mới Cập Nhật</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/latest" className="flex items-center gap-1">
                Xem tất cả
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          {homeResponse?.home?.recentBooks && (
            <BookGrid books={homeResponse?.home?.recentBooks} />
          )}
        </div>

        <div className="mt-12">
          <AdsenseUnit />
        </div>

        <div className="mt-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Đọc Nhiều Nhất</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/popular" className="flex items-center gap-1">
                Xem tất cả
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          {homeResponse?.home?.otherBooks && (
            <BookGrid books={homeResponse?.home?.otherBooks} />
          )}
        </div>
      </div>
    </>
  );
}

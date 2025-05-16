"use client";

import type { Book } from "@/lib/types";
import { BookOpen, Clock, Share2, TableOfContents } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

import { fRelativeTime } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ChapterList } from "./chapter-list";
import { CollapsibleText } from "./ui/collapsible-text";
import { Skeleton } from "./ui/skeleton";

import Link from "next/link";
import { RandomAdsense } from "./ads/random-ads";
import BookCard from "./ui/book-card";
import { BookmarkButton } from "./ui/bookmark-button";

interface BookDetailsProps {
  book?: Book;
  recommence?: Book[];
}
export function BookDetails({ book, recommence }: BookDetailsProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (book) setLoading(false);
    else setLoading(true);
  }, [book]);

  if (loading) {
    return (
      <div className="px-4">
        <div className="flex flex-col items-center">
          <Skeleton className="w-40 aspect-[2/3] object-cover rounded-lg shadow-lg" />
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Button variant="outline" className="w-full gap-2">
            <Skeleton className="w-full gap-2" />
          </Button>
          <Button variant="outline" className="w-full gap-2">
            <Skeleton className="w-full gap-2" />
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 gap-2">
              <Skeleton className="w-full gap-2" />
            </Button>

            <Button variant="outline" className="flex-1 gap-2">
              <Skeleton className="w-full gap-2" />
            </Button>

            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Chia sẻ</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <div className="relative mx-auto w-[200px] md:w-[250px] aspect-[2/3] rounded-lg overflow-hidden shadow-lg mb-6">
              <img
                src={book?.thumbnail?.url || "/placeholder.svg"}
                alt={book?.thumbnail?.slug}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-3">
              <a href={`/books/${book?.slug}/chapters/1`}>
                <Button className="w-full gap-2">
                  <BookOpen className="h-4 w-4" />
                  Đọc từ đầu
                </Button>
              </a>

              <a href={`/books/${book?.slug}/chapters/${book?.total_chapter}`}>
                <Button variant="outline" className="w-full gap-2">
                  <Clock className="h-4 w-4" />
                  Đọc chương mới nhất
                </Button>
              </a>

              <div className="flex gap-2">
                <BookmarkButton book={book!} className="w-full" showText />
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 mt-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{book?.title}</h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
              <div className="flex items-center gap-1">
                <TableOfContents className="h-5 w-5" />
                <span className="font-medium">
                  {Number(book?.chapters?.length)}
                </span>
                <span className="text-muted-foreground">(Chương)</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {book?.categories?.map((category) => {
                return (
                  <Link
                    key={category?.slug}
                    href={"/books/danh-muc/" + category.slug}
                  >
                    <Badge>{category?.name}</Badge>
                  </Link>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground">Tác giả</p>
                <p className="font-medium">{book?.author?.name}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Tình trạng</p>
                <p className="font-medium">
                  {book?.is_full
                    ? "Hoàn thành"
                    : `Chương ${Number(book?.chapters?.length)}`}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Số chương</p>
                <p className="font-medium">
                  {Number(book?.chapters?.length)} chương
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Cập nhật</p>
                <p className="font-medium">{fRelativeTime(book?.created_at)}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-medium mb-2">Giới thiệu</h3>
              <CollapsibleText text={book?.description!} />
            </div>

            <div className="mb-8">
              <RandomAdsense index={2} />
            </div>
          </div>

          <div className="tabs">
            <div className="flex w-full border-b">
              <button
                className="flex-1 px-4 py-2 border-b-2 border-primary font-medium"
                data-tab="chapters"
              >
                Danh sách chương
              </button>
            </div>

            <div className="tab-content pt-6" id="chapters">
              <ChapterList bookSlug={book?.slug!} chapters={book?.chapters!} />
            </div>
          </div>
        </div>
      </div>
      {Number(recommence?.length) > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Truyện Tương Tự</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <BookCard book={book} />
            {recommence?.map((book, index) => {
              return <BookCard key={book.slug + "_" + index} book={book} />;
            })}
          </div>
        </section>
      )}
    </div>
  );
}

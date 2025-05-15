"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Star } from "lucide-react";
import { Book } from "@/lib/types";
import { useCategories } from "@/context/CategoriesContext";

export function FeaturedBook({ book }: { book: Book }) {
  return (
    <div className="relative rounded-lg overflow-hidden bg-slate-900 dark:bg-slate-800">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900/50 z-10"></div>
      <div className="relative z-20 p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10">
        <div className="flex-1 text-white">
          <Badge className="bg-blue-600 hover:bg-blue-700 mb-4">Nổi Bật</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{book.title}</h1>
          {book?.description && (
            <span
              dangerouslySetInnerHTML={{ __html: book?.description! }}
              className="text-gray-300 mb-6 max-w-2xl line-clamp-3"
            />
          )}
          <div className="flex flex-wrap gap-2 mb-6">
            {book?.categories?.map((category) => {
              return (
                <Link
                  key={category.slug}
                  href={`/books/danh-muc/${category.slug}`}
                >
                  <Badge
                    variant="secondary"
                    className="bg-slate-700 text-white hover:bg-slate-600"
                  >
                    {category.name}
                  </Badge>
                </Link>
              );
            })}
          </div>
          <div className="flex gap-3">
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href={`/books/${book?.slug}/chapters/${1}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                Đọc Ngay
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-grey border-gray-600 text-white "
            >
              <Link href={`/books/${book?.slug}`}>Xem Chương</Link>
            </Button>
          </div>
        </div>
        <div className="md:w-1/3 flex justify-center">
          <div className="w-48 h-72 bg-gray-300 rounded-lg overflow-hidden">
            <img
              src={book?.thumbnail?.url}
              alt={book?.thumbnail?.slug}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

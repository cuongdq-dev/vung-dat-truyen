"use client";

import { Skeleton } from "@/components/ui/skeleton";
import type { Book } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";

export function BookList({ books }: { books?: Book[] }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (books) setLoading(false);
    else setLoading(true);
  }, [books]);

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="h-40 w-full rounded-md" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {books?.map((book) => (
        <Link
          href={`/books/${book.slug}`}
          key={book.slug}
          className="flex flex-col"
        >
          <div className="relative">
            <img
              src={
                book.thumbnail?.url || "/placeholder.svg?height=200&width=150"
              }
              alt={book.thumbnail?.slug}
              className="w-full aspect-[2/3] object-cover rounded-md"
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = "/placeholder.svg?height=200&width=150";
              }}
            />
            <div className="absolute bottom-1 left-1 bg-background/80 backdrop-blur-sm text-xs px-1.5 py-0.5 rounded">
              {`Chương ${book?.total_chapter}` || 0}
            </div>
          </div>
          <h3 className="mt-2 text-sm font-medium line-clamp-1">
            {book.title}
          </h3>
          <p className="text-xs text-muted-foreground">{book.author?.name}</p>
        </Link>
      ))}
    </div>
  );
}

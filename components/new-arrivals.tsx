"use client";

import { Skeleton } from "@/components/ui/skeleton";
import type { Book } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ImageCustom } from "./ui/image";

export function NewArrivals({ books }: { books?: Book[] }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (books) setLoading(false);
    else setLoading(true);
  }, [books]);

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-40 w-full rounded-md" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {books?.map((book) => (
        <Link href={`/books/${book.slug}`} key={book.slug}>
          <ImageCustom
            src={book.thumbnail?.url || "/placeholder.svg?height=150&width=100"}
            alt={book.title}
            className="w-full aspect-[2/3] object-cover rounded-md"
          />
        </Link>
      ))}
    </div>
  );
}

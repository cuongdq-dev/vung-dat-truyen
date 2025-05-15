"use client";
import { useCategories } from "@/context/CategoriesContext";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export function Categories() {
  const categories = useCategories();
  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Thể loại</h2>
        <Button variant="ghost" size="sm" asChild>
          <Link href="/the-loai" className="flex items-center gap-1">
            Xem tất cả
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {categories
          .filter((cate) => Number(cate?.bookCount) > 10)
          .slice(0, 10)
          .map((category) => (
            <Link
              key={category.id}
              href={`/books/danh-muc/${category.slug}`}
              className="border rounded-md p-3 hover:border-primary hover:bg-primary/5 transition-colors"
            >
              <div className="font-medium">{category.name}</div>
              <div className="text-sm text-muted-foreground">
                {category?.bookCount} truyện
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

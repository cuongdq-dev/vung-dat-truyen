"use client";
import { Button } from "@/components/ui/button";
import { useSetting } from "@/context/SettingContext";
import Link from "next/link";

export function Categories() {
  const { categories } = useSetting();
  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Thể loại</h2>
        <Button variant="ghost" size="sm" asChild></Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {categories?.map((category) => (
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

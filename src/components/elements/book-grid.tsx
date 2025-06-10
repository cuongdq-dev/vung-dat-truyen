import { BookOpen } from "lucide-react";
import { ImageCustom } from "../ui/image";
// ...existing code...
export function BookGrid({
  books,
  gridCols = { default: 2, sm: 6, md: 6, lg: 6 },
}: {
  books: BookItem[];
  gridCols: { default: number; sm: number; md: number; lg: number };
}) {
  return (
    <div
      className={`grid grid-cols-${gridCols.default} sm:grid-cols-${gridCols.sm} md:grid-cols-${gridCols.md} lg:grid-cols-${gridCols.lg} gap-4 md:gap-6`}
    >
      {books.map((book, index) => (
        <a
          key={book.slug + "-" + index}
          onClick={() => {
            window.location.href = `/${book.slug}`;
          }}
          className="group cursor-pointer"
        >
          <div className="flex flex-col h-full">
            <div className="relative aspect-[2/3] rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 mb-2">
              <ImageCustom
                src={book?.thumbnail?.url || "/placeholder.svg"}
                alt={book?.thumbnail?.slug}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
              {book.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {book?.author?.name}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <BookOpen className="w-3 h-3" />
              <span className="text-xs">
                {book?.total_chapter || book?.chapters?.length} Chương
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

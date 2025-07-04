import { BookOpen } from "lucide-react";
import { ImageCustom } from "../ui/image";
export function BookGrid({
  books,
  className,
}: {
  books: BookItem[];
  className?: string;
}) {
  return (
    <div
      className={`grid gap-4 md:gap-6 grid-cols-2 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-5 ${className}`}
    >
      {books.map((book, index) => (
        <a
          key={book.slug + "-" + index}
          href={`/${book.slug}`}
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

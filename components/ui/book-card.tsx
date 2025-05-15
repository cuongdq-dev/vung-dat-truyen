import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Book } from "@/lib/types";
import { Heart, Star } from "lucide-react";

export default function BookCard({ book }: { book?: Book }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md">
      <a href={`/books/${book?.slug}`} className="aspect-[2/3] overflow-hidden">
        <img
          src={book?.thumbnail?.url || "/placeholder.svg"}
          alt={book?.thumbnail?.slug}
          width={160}
          height={240}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        {book?.is_new && (
          <Badge className="absolute right-2 top-2 bg-green-500 hover:bg-green-600">
            Mới
          </Badge>
        )}
      </a>

      <div className="flex flex-1 flex-col p-3">
        <a href={`/books/${book?.slug}`}>
          <h3 className="font-medium line-clamp-1 group-hover:text-primary">
            {book?.title}
          </h3>
        </a>

        <p className="text-xs text-muted-foreground line-clamp-1">
          {book?.author?.name}
        </p>

        <div className="mt-2 flex">
          {book?.categories &&
            book?.categories?.slice(0, 2).map((category) => {
              return (
                <Badge
                  key={category.slug}
                  variant="outline"
                  className="text-xs"
                >
                  {category?.name}
                </Badge>
              );
            })}
        </div>
      </div>
    </div>
  );
}

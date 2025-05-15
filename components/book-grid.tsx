import Link from "next/link";
import { BookIcon, BookOpen } from "lucide-react";
import { Book } from "@/lib/types";

const books = [
  {
    id: "1",
    title: "Truyện NaN",
    author: "Nguyễn Văn A",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.8,
    views: 125678,
    slug: "truyen-nan",
  },
  {
    id: "2",
    title: "Hành Trình Kỳ Diệu",
    author: "Trần Văn B",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.7,
    views: 98765,
    slug: "hanh-trinh-ky-dieu",
  },
  {
    id: "3",
    title: "Thế Giới Ngầm",
    author: "Lê Thị C",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.5,
    views: 87654,
    slug: "the-gioi-ngam",
  },
  {
    id: "4",
    title: "Bí Mật Đêm Trăng",
    author: "Phạm Văn D",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.6,
    views: 76543,
    slug: "bi-mat-dem-trang",
  },
  {
    id: "5",
    title: "Cuộc Chiến Vương Quyền",
    author: "Hoàng Thị E",
    cover: "/placeholder.svg?height=300&width=200",
    rating: 4.9,
    views: 65432,
    slug: "cuoc-chien-vuong-quyen",
  },
];

export function BookGrid({ books }: { books: Book[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {books.map((book) => (
        <Link key={book.id} href={`/books/${book.slug}`} className="group">
          <div className="flex flex-col h-full">
            <div className="relative aspect-[2/3] rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 mb-2">
              <img
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
              <span className="text-xs">{book.total_chapter} Chương</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

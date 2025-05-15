"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import type { BookmarkItem } from "@/lib/bookmark";
import {
  clearBookmarks,
  getBookmarks,
  removeBookmark,
  subscribeToBookmarkChanges,
} from "@/lib/bookmark";
import { fRelativeTime } from "@/lib/utils";
import { BookOpen, ChevronLeft, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BookmarkClientPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const loadBookmarks = () => {
      setBookmarks(getBookmarks());
    };

    // Initial load
    loadBookmarks();

    // Subscribe to bookmark changes
    const unsubscribe = subscribeToBookmarkChanges(loadBookmarks);

    return unsubscribe;
  }, []);

  const handleRemoveBookmark = (id: string) => {
    removeBookmark(id);
    toast({
      title: "Đã xóa khỏi danh sách đánh dấu",
      description: "Truyện đã được xóa khỏi danh sách đánh dấu của bạn.",
    });
  };

  const handleClearBookmarks = () => {
    clearBookmarks();
    toast({
      title: "Đã xóa tất cả đánh dấu",
      description: "Tất cả truyện đã được xóa khỏi danh sách đánh dấu của bạn.",
    });
  };

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="p-2">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold">Danh sách đánh dấu</h1>
        </div>

        {bookmarks.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Xóa tất cả
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Xóa tất cả đánh dấu?</AlertDialogTitle>
                <AlertDialogDescription>
                  Hành động này sẽ xóa tất cả truyện khỏi danh sách đánh dấu của
                  bạn và không thể hoàn tác.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Hủy</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearBookmarks}>
                  Xóa tất cả
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-lg font-medium mb-2">
            Chưa có truyện nào được đánh dấu
          </h2>
          <p className="text-muted-foreground mb-6">
            Đánh dấu truyện yêu thích để dễ dàng tìm và đọc sau này.
          </p>
          <Button asChild>
            <Link href="/books">Khám phá truyện</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarks.map((bookmark) => (
            <div key={bookmark.id} className="border rounded-lg p-4 flex gap-4">
              <div className="w-16 h-24 flex-shrink-0">
                <img
                  src={
                    bookmark?.thumbnail_url ||
                    "/placeholder.svg?height=96&width=64"
                  }
                  alt={bookmark?.slug}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium line-clamp-1">{bookmark?.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {bookmark?.author?.name}
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  Đánh dấu: {fRelativeTime(bookmark.addedAt!)}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="flex-1"
                  >
                    <Link href={`/books/${bookmark.slug}`}>Xem</Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleRemoveBookmark(bookmark?.id!)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useEffect, useState } from "react";
import {
  addBookmark,
  isBookmarked,
  removeBookmark,
  subscribeToBookmarkChanges,
} from "../../lib/utils/bookmark";
import { Button, type ButtonProps } from "../ui/button";
import { useToast } from "./use-toast";

interface BookmarkButtonProps extends Omit<ButtonProps, "onClick"> {
  book: BookItem;
  showText?: boolean;
  onBookmarkChange?: (isBookmarked: boolean) => void;
}

export function BookmarkButton({
  book,
  showText = false,
  onBookmarkChange,
  className,
  variant = "outline",
  ...props
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const { toast } = useToast();

  // Check initial bookmark status and subscribe to changes
  useEffect(() => {
    const checkBookmarkStatus = () => {
      setBookmarked(isBookmarked(book.id));
    };

    // Initial check
    checkBookmarkStatus();

    // Subscribe to bookmark changes
    const unsubscribe = subscribeToBookmarkChanges(checkBookmarkStatus);

    return unsubscribe;
  }, [book?.id]);

  const toggleBookmark = () => {
    if (bookmarked) {
      removeBookmark(book.id);
      setBookmarked(false);
      toast({
        title: "Đã xóa khỏi danh sách đánh dấu",
        description: `"${book.title}" đã được xóa khỏi danh sách đánh dấu của bạn.`,
      });
      if (onBookmarkChange) onBookmarkChange(false);
    } else {
      addBookmark(book);
      setBookmarked(true);
      toast({
        title: "Đã thêm vào danh sách đánh dấu",
        description: `"${book.title}" đã được thêm vào danh sách đánh dấu của bạn.`,
      });
      if (onBookmarkChange) onBookmarkChange(true);
    }
  };

  return (
    <Button
      variant={variant}
      className={className}
      onClick={toggleBookmark}
      {...props}
    >
      {bookmarked ? (
        <BookmarkCheck className={`h-4 w-4 ${showText ? "mr-2" : ""}`} />
      ) : (
        <Bookmark className={`h-4 w-4 ${showText ? "mr-2" : ""}`} />
      )}
      {showText && (bookmarked ? "Đã đánh dấu" : "Đánh dấu")}
    </Button>
  );
}

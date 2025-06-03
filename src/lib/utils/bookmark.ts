// Type for bookmark data
export interface BookmarkItem {
  id?: string;
  title?: string;
  author?: { name?: string; slug?: string };
  cover?: string;
  slug?: string;
  categories?: CategoryItem[];
  addedAt?: Date;
  is_full?: boolean;
  is_hot?: boolean;
  is_new?: boolean;
  thumbnail_url?: string;
}

// Key for localStorage
const BOOKMARK_STORAGE_KEY = "studiall-bookmarks";

// Event for bookmark changes
const BOOKMARK_CHANGE_EVENT = "bookmarkChange";

// Custom event for bookmark changes
export function dispatchBookmarkChangeEvent() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(BOOKMARK_CHANGE_EVENT));
  }
}

// Subscribe to bookmark changes
export function subscribeToBookmarkChanges(callback: () => void) {
  if (typeof window !== "undefined") {
    window.addEventListener(BOOKMARK_CHANGE_EVENT, callback);
    return () => window.removeEventListener(BOOKMARK_CHANGE_EVENT, callback);
  }
  return () => {};
}

// Get all bookmarks from localStorage
export function getBookmarks(): BookmarkItem[] {
  if (typeof window === "undefined") return [];

  try {
    const bookmarks = localStorage.getItem(BOOKMARK_STORAGE_KEY);
    return bookmarks ? JSON.parse(bookmarks) : [];
  } catch (error) {
    console.error("Error getting bookmarks from localStorage:", error);
    return [];
  }
}

// Add a book to bookmarks
export function addBookmark(book: BookItem): BookmarkItem[] {
  if (typeof window === "undefined") return [];

  try {
    const bookmarks = getBookmarks();

    // Check if book is already bookmarked
    if (!bookmarks.some((bookmark) => bookmark.id === book.id)) {
      const newBookmark: BookmarkItem = {
        id: book.id,
        title: book.title,
        author: book.author,
        thumbnail_url: book.thumbnail?.url,
        slug: book.slug,
        addedAt: new Date(),
      };

      const updatedBookmarks = [newBookmark, ...bookmarks];
      localStorage.setItem(
        BOOKMARK_STORAGE_KEY,
        JSON.stringify(updatedBookmarks)
      );
      dispatchBookmarkChangeEvent();
      return updatedBookmarks;
    }

    return bookmarks;
  } catch (error) {
    console.error("Error adding bookmark to localStorage:", error);
    return [];
  }
}

// Remove a book from bookmarks
export function removeBookmark(bookId: string): BookmarkItem[] {
  if (typeof window === "undefined") return [];

  try {
    const bookmarks = getBookmarks();
    const updatedBookmarks = bookmarks.filter(
      (bookmark) => bookmark.id !== bookId
    );
    localStorage.setItem(
      BOOKMARK_STORAGE_KEY,
      JSON.stringify(updatedBookmarks)
    );
    dispatchBookmarkChangeEvent();
    return updatedBookmarks;
  } catch (error) {
    console.error("Error removing bookmark from localStorage:", error);
    return [];
  }
}

// Check if a book is bookmarked
export function isBookmarked(bookId: string): boolean {
  if (typeof window === "undefined") return false;

  try {
    const bookmarks = getBookmarks();
    return bookmarks.some((bookmark) => bookmark.id === bookId);
  } catch (error) {
    console.error("Error checking bookmark status:", error);
    return false;
  }
}

// Clear all bookmarks
export function clearBookmarks(): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify([]));
    dispatchBookmarkChangeEvent();
  } catch (error) {
    console.error("Error clearing bookmarks:", error);
  }
}

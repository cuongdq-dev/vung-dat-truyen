import type { Metadata } from "next";
import BookmarkClientPage from "./BookmarkClientPage";

export const metadata: Metadata = {
  title: "Danh sách đánh dấu | Studiall",
  description: "Xem danh sách truyện bạn đã đánh dấu",
};

export default function BookmarkPage() {
  return <BookmarkClientPage />;
}

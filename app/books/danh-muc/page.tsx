import type { Metadata } from "next";
import BookCatalogClient from "./BookCatalogClient";
import { getBooks } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Danh mục truyện | Vùng Đất Truyện",
  description: "Khám phá tất cả truyện trong thư viện của chúng tôi",
};

// This function pre-fetches the books on the server
export default async function BookCatalogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const datasource = await getBooks(searchParams);
  const genres = new Set<string>();
  const allGenres = Array.from(genres).sort();
  return (
    <BookCatalogClient
      datasource={datasource!}
      allGenres={allGenres}
      searchParams={searchParams}
    />
  );
}

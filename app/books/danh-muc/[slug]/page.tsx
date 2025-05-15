import { getBooksByCategory } from "@/lib/api";
import type { Metadata } from "next";
import BookCatalogClient from "../BookCatalogClient";

interface Props {
  params: { slug: string };
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Danh mục truyện | Vùng Đất Truyện",
  description: "Khám phá tất cả truyện trong thư viện của chúng tôi",
};

// This function pre-fetches the books on the server
export default async function BookCatalogPage({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
} & Props) {
  const datasource = await getBooksByCategory(params.slug, searchParams);
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

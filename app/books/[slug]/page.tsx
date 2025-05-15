import { BookDetails } from "@/components/book-details";
import { getBookById as getBookBySlug } from "@/lib/api";

interface BookPageProps {
  params: { slug: string };
}

export default async function BookPage({ params }: BookPageProps) {
  const detail = await getBookBySlug(params?.slug);
  return <BookDetails book={detail?.data} recommence={detail?.recommence} />;
}

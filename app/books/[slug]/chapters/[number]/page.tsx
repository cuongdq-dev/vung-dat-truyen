import { AdsenseUnit } from "@/components/ads/ad-unit";
import { Button } from "@/components/ui/button";
import { getChapterContent } from "@/lib/api";
import { ChevronLeft, ChevronRight, TableOfContents } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ChapterPageProps {
  params: {
    slug: string;
    number: string;
  };
  searchParams: {
    page?: string;
  };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: ChapterPageProps): Promise<Metadata> {
  const chapter = await getChapterContent(
    params.slug,
    Number.parseInt(params.number)
  );

  if (!chapter) {
    return {
      title: "Không tìm thấy truyện - Vùng Đất Truyện",
    };
  }

  return {
    title: `Chương ${params.number}: ${chapter.title} - ${chapter?.book?.title} - Vùng Đất Truyện`,
  };
}

export default async function ReadPage({ params }: ChapterPageProps) {
  const chapterNumber = Number.parseInt(params.number);
  const chapter = await getChapterContent(params.slug, chapterNumber);

  if (!chapter) {
    notFound();
  }

  if (!chapter.book) {
    notFound();
  }

  const prevChapter = chapterNumber > 1 ? chapterNumber - 1 : null;
  const nextChapter =
    chapterNumber < Number(chapter?.book?.total_chapter)
      ? chapterNumber + 1
      : null;

  return (
    <div className="container">
      <div className="prose dark:prose-invert mx-auto max-w-6xl">
        <div className="text-center">
          <h4 className="font-normal">{chapter?.book?.title}</h4>
          <h2 className="text-center">{chapter.title}</h2>
        </div>
        <ButtonGroup
          slug={params.slug}
          nextChapter={nextChapter}
          prevChapter={prevChapter}
        />
        <div className="mt-6 max-h-[100px]">
          <AdsenseUnit />
        </div>
        <div dangerouslySetInnerHTML={{ __html: chapter?.content! }} />
      </div>

      <ButtonGroup
        slug={params.slug}
        nextChapter={nextChapter}
        prevChapter={prevChapter}
      />
    </div>
  );
}
const ButtonGroup = ({
  prevChapter,
  nextChapter,
  slug,
}: {
  prevChapter: number | null;
  nextChapter: number | null;
  slug: string;
}) => {
  return (
    <div className="flex gap-2 m-2 justify-center">
      {prevChapter ? (
        <Link href={`/books/${slug}/chapters/${prevChapter}`}>
          <Button
            variant="outline"
            className="flex items-center gap-2 md:text-xs"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="block md:hidden">Trước</span>
            <span className="hidden md:block">Chương trước</span>
          </Button>
        </Link>
      ) : (
        <Button
          variant="outline"
          disabled
          className="flex items-center gap-2 md:text-xs"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="block md:hidden">Trước</span>
          <span className="hidden md:block">Chương trước</span>
        </Button>
      )}

      <Link href={`/books/${slug}`}>
        <Button variant="outline">
          <TableOfContents className="h-4 w-4" />
        </Button>
      </Link>

      {nextChapter ? (
        <Link href={`/books/${slug}/chapters/${nextChapter}`}>
          <Button
            variant="outline"
            className="flex items-center gap-2 md:text-xs"
          >
            <span className="block md:hidden">Sau</span>
            <span className="hidden md:block">Chương sau</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      ) : (
        <Button
          variant="outline"
          disabled
          className="flex items-center gap-2 md:text-xs"
        >
          <span className="block md:hidden">Sau</span>
          <span className="hidden md:block">Chương sau</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

import { ChevronLeft, ChevronRight, TableOfContents } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const ChapterButtonGroup = ({
  prevChapter,
  nextChapter,
  slug,
  chapters,
  chapterCurrent,
}: {
  prevChapter: number | null;
  nextChapter: number | null;
  slug: string;
  chapters: Chapter[];
  chapterCurrent: number;
}) => {
  return (
    <div className="flex gap-2 m-2 justify-center">
      {prevChapter ? (
        <a href={`/${slug}/chuong/${prevChapter}`}>
          <Button
            variant="outline"
            className="flex items-center gap-2 md:text-xs"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="block md:hidden">Trước</span>
            <span className="hidden md:block">Chương trước</span>
          </Button>
        </a>
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

      <ListChapter
        chapterCurrent={chapterCurrent}
        slug={slug}
        chapters={chapters}
      />
      {nextChapter ? (
        <a href={`/${slug}/chuong/${nextChapter}`}>
          <Button
            variant="outline"
            className="flex items-center gap-2 md:text-xs"
          >
            <span className="block md:hidden">Sau</span>
            <span className="hidden md:block">Chương sau</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </a>
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

export const ListChapter = ({
  slug,
  chapters,
  chapterCurrent,
}: {
  slug: string;
  chapters: Chapter[];
  chapterCurrent: number;
}) => {
  return (
    <Select
      value={chapterCurrent.toString()}
      onValueChange={(value) => {
        window.open(`/${slug}/chuong/${value}`, "_self");
      }}
    >
      <SelectTrigger className="w-[fit-content]">
        <SelectValue>
          <TableOfContents className="h-4 w-4" />
        </SelectValue>
      </SelectTrigger>
      <SelectContent align="center">
        <SelectGroup className="h-[40vh]">
          {chapters.map((chapter) => {
            return (
              <SelectItem
                key={chapter.chapter_number + "_" + chapter.title}
                className={`${
                  chapter.chapter_number == chapterCurrent
                    ? "bg-primary/10"
                    : ""
                }`}
                value={chapter?.chapter_number?.toString()!}
              >
                {chapter.title}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

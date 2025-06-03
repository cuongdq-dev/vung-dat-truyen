import type React from "react";

import { Button } from "../ui/button";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { useState } from "react";
import { fRelativeTime } from "~/lib/utils/format-time";

interface ChapterListProps {
  chapters: Chapter[];
  bookSlug: string;
}

export function ChapterList({ chapters, bookSlug }: ChapterListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const chaptersPerPage = 10;

  // Sort chapters based on the selected order
  const sortedChapters = [...chapters].sort((a, b) => {
    if (sortOrder === "newest") {
      return Number(b?.chapter_number) - Number(a?.chapter_number);
    } else {
      return Number(a?.chapter_number) - Number(b?.chapter_number);
    }
  });

  // Calculate pagination
  const totalPages = Math.ceil(chapters.length / chaptersPerPage);
  const startIndex = (currentPage - 1) * chaptersPerPage;
  const endIndex = Math.min(startIndex + chaptersPerPage, chapters.length);
  const currentChapters = sortedChapters.slice(startIndex, endIndex);

  // Handle page changes
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    // Scroll to top of chapter list
    document
      .getElementById("chapter-list-top")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value as "newest" | "oldest");
    setCurrentPage(1); // Reset to first page when changing sort order
  };

  return (
    <div>
      <div
        id="chapter-list-top"
        className="flex justify-between items-center mb-4"
      >
        <h3 className="font-medium">{chapters.length} chương</h3>
        <Tabs defaultValue={sortOrder} onValueChange={handleSortChange}>
          <TabsList>
            <TabsTrigger value="newest">Mới nhất</TabsTrigger>
            <TabsTrigger value="oldest">Cũ nhất</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="border rounded-lg divide-y">
        {currentChapters.map((chapter) => (
          <a
            key={chapter.slug}
            href={`/${bookSlug}/chuong/${chapter.chapter_number}`}
            className="flex justify-between items-center p-4 hover:bg-muted/50 transition-colors"
          >
            <div>
              <h4 className="font-medium">{chapter.title}</h4>
            </div>
            <div className="text-sm text-muted-foreground">
              {fRelativeTime(chapter.created_at)}
            </div>
          </a>
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            title="Trang đầu"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            title="Trang trước"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1 mx-2">
            {generatePaginationButtons(currentPage, totalPages, goToPage)}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            title="Trang sau"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
            title="Trang cuối"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

// Helper function to generate pagination buttons
function generatePaginationButtons(
  currentPage: number,
  totalPages: number,
  goToPage: (page: number) => void
): React.ReactNode {
  const buttons = [];
  const maxVisibleButtons = 5; // Maximum number of page buttons to show

  let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

  // Adjust if we're near the end
  if (endPage - startPage + 1 < maxVisibleButtons) {
    startPage = Math.max(1, endPage - maxVisibleButtons + 1);
  }

  // Generate the visible page buttons
  for (let i = startPage; i <= endPage; i++) {
    buttons.push(
      <Button
        key={i}
        variant={i === currentPage ? "default" : "outline"}
        size="sm"
        onClick={() => goToPage(i)}
        className="w-9 h-9"
      >
        {i}
      </Button>
    );
  }

  return buttons;
}

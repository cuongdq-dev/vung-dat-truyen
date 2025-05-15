"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageNumbers?: boolean;
  showFirstLast?: boolean;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  showFirstLast = true,
  className = "",
}: PaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);

      // Calculate start and end of visible pages
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        end = Math.min(totalPages - 1, 4);
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 3);
      }

      // Add ellipsis if needed before middle pages
      if (start > 2) {
        pageNumbers.push(-1); // -1 represents ellipsis
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis if needed after middle pages
      if (end < totalPages - 1) {
        pageNumbers.push(-2); // -2 represents ellipsis
      }

      // Always show last page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`flex flex-col items-center space-y-2 ${className}`}>
      <div className="flex items-center space-x-2">
        {showFirstLast && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            title="Trang đầu"
            aria-label="Đi đến trang đầu tiên"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
        )}

        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          title="Trang trước"
          aria-label="Đi đến trang trước"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {showPageNumbers && (
          <div className="flex items-center space-x-1">
            {pageNumbers.map((pageNumber, index) => {
              if (pageNumber < 0) {
                // Render ellipsis
                return (
                  <span key={`ellipsis-${index}`} className="px-2">
                    ...
                  </span>
                );
              }

              return (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  size="icon"
                  onClick={() => onPageChange(pageNumber)}
                  className="w-9 h-9"
                  aria-label={`Đi đến trang ${pageNumber}`}
                  aria-current={currentPage === pageNumber ? "page" : undefined}
                >
                  {pageNumber}
                </Button>
              );
            })}
          </div>
        )}

        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          title="Trang sau"
          aria-label="Đi đến trang sau"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {showFirstLast && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            title="Trang cuối"
            aria-label="Đi đến trang cuối cùng"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        Trang {currentPage} / {totalPages}
      </div>
    </div>
  );
}

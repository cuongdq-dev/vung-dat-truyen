"use client";

import type React from "react";

import { BookGrid } from "@/components/book-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import type { ListBookResponse } from "@/lib/types";
import { ChevronLeft, Filter, Search, SortAsc, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Pagination } from "@/components/pagination";

interface BookCatalogClientProps {
  datasource: ListBookResponse;
  allGenres: string[];
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function BookCatalogClient({
  datasource,
  allGenres,
  searchParams,
}: BookCatalogClientProps) {
  const listBooks = datasource.data;
  const router = useRouter();
  const pathname = usePathname();
  // Parse search params with defaults
  const page = Number(searchParams.page || "1");
  const query = (searchParams.q || "") as string;
  const sort = (searchParams.sort || "newest") as string;
  const status = (searchParams.status || "all") as string;
  const genreParams = searchParams.genre
    ? Array.isArray(searchParams.genre)
      ? searchParams.genre
      : [searchParams.genre]
    : [];

  // Local state for UI
  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(genreParams);
  const [selectedStatus, setSelectedStatus] = useState<string>(status);
  const [sortBy, setSortBy] = useState<string>(sort);
  const [currentPage, setCurrentPage] = useState(page);
  const [isLoading, setIsLoading] = useState(false);

  const updateUrlParams = (params: Record<string, any>) => {
    setIsLoading(true);

    // Create URL search params
    const urlSearchParams = new URLSearchParams();

    // Add page parameter if not 1
    if (params.page && params.page > 1) {
      urlSearchParams.set("page", params.page.toString());
    }

    // Add search query if present
    if (params.q && params.q.trim() !== "") {
      urlSearchParams.set("q", params.q);
    }

    // Add sort if not default
    if (params.sort && params.sort !== "newest") {
      urlSearchParams.set("sort", params.sort);
    }

    // Add status if not default
    if (params.status && params.status !== "all") {
      urlSearchParams.set("status", params.status);
    }

    // Add genres if present
    if (params.genre && params.genre.length > 0) {
      params.genre.forEach((genre: string) => {
        urlSearchParams.append("genre", genre);
      });
    }

    // Create the URL string
    const queryString = urlSearchParams.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;

    // Update the URL
    router.push(url);

    // Small delay to show loading state
    setTimeout(() => setIsLoading(false), 300);
  };

  // Handle search submission
  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    updateUrlParams({
      q: searchQuery,
      page: 1, // Reset to first page on new search
      sort: sortBy,
      status: selectedStatus,
      genre: selectedGenres,
    });
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    updateUrlParams({
      page,
      q: query,
      sort: sortBy,
      status: selectedStatus,
      genre: selectedGenres,
    });

    // Scroll to top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle genre toggle
  const handleGenreToggle = (genre: string) => {
    const newGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];

    setSelectedGenres(newGenres);
  };

  // Apply filters
  const applyFilters = () => {
    updateUrlParams({
      page: 1, // Reset to first page on filter change
      q: searchQuery,
      sort: sortBy,
      status: selectedStatus,
      genre: selectedGenres,
    });
  };

  // Remove a specific genre filter
  const removeGenreFilter = (genre: string) => {
    const newGenres = selectedGenres.filter((g) => g !== genre);
    setSelectedGenres(newGenres);

    updateUrlParams({
      page: 1,
      q: query,
      sort: sortBy,
      status: selectedStatus,
      genre: newGenres,
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedGenres([]);
    setSelectedStatus("all");
    setSortBy("newest");
    setSearchQuery("");
    setCurrentPage(1);

    router.push(pathname);
  };

  // Handle sort change
  const handleSortChange = (value: string) => {
    // Prevent unnecessary updates if the value hasn't changed
    if (value === sortBy) return;

    setSortBy(value);

    updateUrlParams({
      page: 1,
      q: query,
      sort: value,
      status: selectedStatus,
      genre: selectedGenres,
    });
  };

  // Handle status change
  const handleStatusChange = (value: string) => {
    // Prevent unnecessary updates if the value hasn't changed
    if (value === selectedStatus) return;

    setSelectedStatus(value);
  };

  // Sync local state with URL params when they change externally
  useEffect(() => {
    // Only update if values are different to prevent unnecessary re-renders
    if (searchQuery !== query) setSearchQuery(query);
    if (JSON.stringify(selectedGenres) !== JSON.stringify(genreParams))
      setSelectedGenres(genreParams);
    if (selectedStatus !== status) setSelectedStatus(status);
    if (sortBy !== sort) setSortBy(sort);
    if (currentPage !== page) setCurrentPage(page);
  }, [
    query,
    genreParams,
    status,
    sort,
    page,
    searchQuery,
    selectedGenres,
    selectedStatus,
    sortBy,
    currentPage,
  ]);

  if (isLoading) {
    return (
      <div className="container py-6">
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-8 w-48" />
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Skeleton className="aspect-[2/3] rounded-md" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-1">
        <div className="flex items-center gap-2">
          <Link href="/" className="p-2">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-xl font-bold">Danh mục truyện</h1>
        </div>

        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Bộ lọc</span>
                {(selectedGenres.length > 0 || selectedStatus !== "all") && (
                  <Badge variant="secondary" className="ml-1">
                    {selectedGenres.length + (selectedStatus !== "all" ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Bộ lọc</SheetTitle>
                <SheetDescription>
                  Lọc truyện theo thể loại, trạng thái và các tiêu chí khác
                </SheetDescription>
              </SheetHeader>

              <div className="py-4">
                <h3 className="font-medium mb-3">Thể loại</h3>
                <div className="grid grid-cols-2 gap-2">
                  {allGenres.map((genre) => (
                    <div key={genre} className="flex items-center space-x-2">
                      <Checkbox
                        id={`genre-${genre}`}
                        checked={selectedGenres.includes(genre)}
                        onCheckedChange={() => handleGenreToggle(genre)}
                      />
                      <Label htmlFor={`genre-${genre}`} className="text-sm">
                        {genre}
                      </Label>
                    </div>
                  ))}
                </div>

                <h3 className="font-medium mt-6 mb-3">Trạng thái</h3>
                <Select
                  value={selectedStatus}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="Đang cập nhật">
                        Đang cập nhật
                      </SelectItem>
                      <SelectItem value="Hoàn thành">Hoàn thành</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <SheetFooter>
                <SheetClose asChild>
                  <Button variant="outline" onClick={clearFilters}>
                    Xóa bộ lọc
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button onClick={applyFilters}>Áp dụng</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[160px]">
              <div className="flex items-center gap-2">
                <SortAsc className="h-4 w-4" />
                <SelectValue placeholder="Sắp xếp" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sắp xếp theo</SelectLabel>
                <SelectItem value="newest">Mới nhất</SelectItem>
                <SelectItem value="oldest">Cũ nhất</SelectItem>
                <SelectItem value="title-asc">Tên A-Z</SelectItem>
                <SelectItem value="title-desc">Tên Z-A</SelectItem>
                <SelectItem value="rating-high">Đánh giá cao nhất</SelectItem>
                <SelectItem value="rating-low">Đánh giá thấp nhất</SelectItem>
                <SelectItem value="popular">Phổ biến nhất</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <form onSubmit={handleSearch} className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Tìm kiếm theo tên truyện hoặc tác giả..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 pr-9"
        />
        {searchQuery && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => {
              setSearchQuery("");
              if (query) {
                updateUrlParams({
                  page: 1,
                  sort: sortBy,
                  status: selectedStatus,
                  genre: selectedGenres,
                });
              }
            }}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      {/* Active filters display */}
      {(selectedGenres.length > 0 || selectedStatus !== "all") && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedGenres.map((genre) => (
            <Badge
              key={genre}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {genre}
              <button onClick={() => removeGenreFilter(genre)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}

          {selectedStatus !== "all" && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {selectedStatus}
              <button
                onClick={() => {
                  setSelectedStatus("all");
                  updateUrlParams({
                    page: 1,
                    q: query,
                    sort: sortBy,
                    status: "all",
                    genre: selectedGenres,
                  });
                }}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-6 px-2"
          >
            Xóa tất cả
          </Button>
        </div>
      )}

      {/* Results count */}
      <div className="mb-4 text-sm text-muted-foreground">
        Hiển thị {listBooks.length} truyện
      </div>

      {listBooks.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-lg font-medium mb-2">
            Không tìm thấy truyện nào
          </h2>
          <p className="text-muted-foreground mb-6">
            Không có truyện nào phù hợp với bộ lọc hiện tại. Vui lòng thử lại
            với bộ lọc khác.
          </p>
          <Button onClick={clearFilters}>Xóa bộ lọc</Button>
        </div>
      ) : (
        <>
          <BookGrid books={listBooks} />

          <div className="mt-8">
            <Pagination
              currentPage={datasource.meta.currentPage}
              onPageChange={handlePageChange}
              totalPages={datasource.meta.totalPages}
              showPageNumbers
              showFirstLast
            />
          </div>
        </>
      )}
    </div>
  );
}

import { ChevronLeft, Search, SortAsc, X } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Skeleton } from "../ui/skeleton";
import { BookGrid } from "./book-grid";
import { Pagination } from "./pagination";
import { Input } from "../ui/input";

interface BookCatalogClientProps {
  datasource: ListBookResponse;
  searchParams: { [key: string]: string | string[] | undefined };
  categorySlug?: string;
}

export default function BookCatalogClient({
  datasource,
  searchParams,
  categorySlug,
}: BookCatalogClientProps) {
  const [data, setData] = useState(datasource);
  const listBooks = data.data;

  const sort = (searchParams.sort || "created_at:DESC") as string;
  const query = (searchParams.search || "") as string;

  const [sortBy, setSortBy] = useState<string>(sort);
  const [searchQuery, setSearchQuery] = useState(query);

  const [isLoading, setIsLoading] = useState(!datasource);

  const fetchData = async (params: URLSearchParams) => {
    const paramsObject = Object.fromEntries(params.entries());
    if (categorySlug) {
      paramsObject["category"] = categorySlug;
    }

    const response = await fetch(
      `/api/book?${new URLSearchParams(paramsObject).toString()}`,
      {}
    );
    if (response.ok) {
      const result = (await response.json()) as ListBookResponse;
      setData(result);
    }
    setIsLoading(false);
  };

  const updateUrlParams = async (params: Record<string, any>) => {
    const urlSearchParams = new URLSearchParams();
    setIsLoading(true);

    if (params.page && params.page > 1) {
      urlSearchParams.set("page", params.page.toString());
    }

    if (params.search && params.search.trim() !== "") {
      urlSearchParams.set("search", params.search);
    }

    if (params.sort && params.sort !== "newest") {
      urlSearchParams.set("sortBy", params.sort);
    }

    if (params.genre && params.genre.length > 0) {
      params.genre.forEach((genre: string) => {
        urlSearchParams.append("genre", genre);
      });
    }

    const queryString = urlSearchParams.toString();
    const currentPath = window.location.pathname;
    const url = queryString ? `${currentPath}?${queryString}` : currentPath;
    await fetchData(urlSearchParams);
    window.history.pushState({}, "", url);
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    updateUrlParams({ search: searchQuery, page: 1, sort: sortBy });
  };

  const handlePageChange = (page: number) => {
    updateUrlParams({
      page,
      sort: sortBy,
      search: searchQuery,
    });
  };

  const handleSortChange = (value: string) => {
    if (value === sortBy) return;

    setSortBy(value);

    updateUrlParams({
      page: 1,
      sort: value,
      search: searchQuery,
    });
  };

  return (
    <div className="container py-4 px-4">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-1">
        <div className="flex items-center gap-2">
          <a data-astro-prefetch={false} href="/" className="p-2">
            <ChevronLeft className="h-5 w-5" />
          </a>
          <h1 className="text-xl font-bold">Danh mục truyện</h1>
        </div>

        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={handleSortChange}>
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <SortAsc className="h-4 w-4" />
                <SelectValue className="text-nowrap" placeholder="Sắp xếp" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sắp xếp theo</SelectLabel>
                <SelectItem value="created_at:DESC">Mới nhất</SelectItem>
                <SelectItem value="created_at:ASC">Cũ nhất</SelectItem>
                <SelectItem value="title:ASC">Tên A-Z</SelectItem>
                <SelectItem value="title:DESC">Tên Z-A</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <form onSubmit={handleSearch} className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Tìm kiếm theo tên truyện..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 w-full bg-muted border-none"
        />
        {searchQuery && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => {
              setSearchQuery("");
              if (query) {
                updateUrlParams({ page: 1, sort: sortBy });
              }
            }}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      {isLoading ? (
        <>
          <Skeleton className="h-10 flex-1 mb-4 text-sm text-muted-foreground" />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Skeleton className="aspect-[2/3] rounded-md" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
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
                Không có truyện nào phù hợp với bộ lọc hiện tại. Vui lòng thử
                lại.
              </p>
            </div>
          ) : (
            <>
              <BookGrid books={listBooks} />

              <div className="mt-8">
                <Pagination
                  currentPage={data?.meta?.currentPage}
                  onPageChange={handlePageChange}
                  totalPages={data?.meta?.totalPages}
                  showPageNumbers
                  showFirstLast
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

import { Search } from "lucide-react";
import type React from "react";
import { Input } from "../ui/input";

import { useEffect, useState } from "react";

export function SearchBar({ search = "" }: { search?: string }) {
  const [query, setQuery] = useState(search);

  useEffect(() => {
    setQuery(search);
  }, [search]);

  const updateURL = (newSearch: string) => {
    const url = new URL(window.location.href);

    if (newSearch.trim()) {
      url.searchParams.set("search", newSearch.trim());
    } else {
      url.searchParams.delete("search");
    }

    // Reset to first page when searching
    url.searchParams.delete("page");

    window.history.pushState({}, "", url.toString());

    // Trigger a custom event to notify other components
    window.dispatchEvent(
      new CustomEvent("urlChanged", {
        detail: { search: newSearch.trim() },
      })
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      updateURL(query);
      // TODO UPDATE LAYOUT SEARCH
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Tìm kiếm..."
        value={query}
        onChange={(e: any) => setQuery(e.target.value)}
        className="pl-9 w-full bg-muted border-none"
      />
    </form>
  );
}

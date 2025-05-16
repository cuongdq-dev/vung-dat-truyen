"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { SearchBar } from "./search-bar";
import { useSetting } from "@/context/SettingContext";
import Link from "next/link";

export function Header() {
  const { categories } = useSetting();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container px-4 py-2 flex h-14 items-center w-full lg:max-w-[70%] flex row justify-between">
        <div className="flex items-center gap-2 mr-4"></div>

        <div className="flex row items-center gap-2">
          <SearchBar />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-1 h-8">
                Thể loại
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {categories?.map((category) => {
                return (
                  <Link
                    key={"link_" + category.slug}
                    href={`/books/danh-muc/${category.slug}`}
                  >
                    <DropdownMenuItem key={category.slug}>
                      {category.name} ({category.bookCount})
                    </DropdownMenuItem>
                  </Link>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

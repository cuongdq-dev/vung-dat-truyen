"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Book, ChevronDown } from "lucide-react";
import Link from "next/link";
import { SearchBar } from "./search-bar";

export function Header() {
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
              <DropdownMenuItem>Tiểu thuyết</DropdownMenuItem>
              <DropdownMenuItem>Kỳ ảo</DropdownMenuItem>
              <DropdownMenuItem>Phiêu lưu</DropdownMenuItem>
              <DropdownMenuItem>Hành động</DropdownMenuItem>
              <DropdownMenuItem>Lãng mạn</DropdownMenuItem>
              <DropdownMenuItem>Kinh dị</DropdownMenuItem>
              <DropdownMenuItem>Trinh thám</DropdownMenuItem>
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

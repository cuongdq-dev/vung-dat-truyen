import { ChevronDown, TableOfContents } from "lucide-react";
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
import * as SelectPrimitive from "@radix-ui/react-select";

export function CategoriesList({
  slug,
  categories,
}: {
  slug: string;
  categories: CategoryItem[];
}) {
  return (
    <Select
      defaultValue={slug}
      onValueChange={(value) => {
        window.open(`/danh-muc/${value}`, "_self");
      }}
    >
      <SelectTrigger className="w-[fit-content]">
        <SelectValue placeholder="Thể loại"></SelectValue>
        <SelectPrimitive.Icon asChild>
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </SelectPrimitive.Icon>
      </SelectTrigger>
      <SelectContent align="center">
        <SelectGroup className="h-[50vh]">
          {categories?.map((category) => {
            return (
              <SelectItem
                key={category.slug}
                value={category?.slug?.toString()!}
              >
                {category.name} ({category.bookCount})
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

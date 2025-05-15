import { CategoryItem } from "@/lib/types";
import { createContext, useContext } from "react";

// Khởi tạo context với default là undefined
export const CategoriesContext = createContext<CategoryItem[] | undefined>(
  undefined
);

export function useCategories() {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories must be used within CategoriesProvider");
  }
  return context;
}

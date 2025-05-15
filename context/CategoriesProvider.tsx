"use client";

import { ReactNode } from "react";
import { CategoriesContext, type Category } from "./CategoriesContext";

interface Props {
  value: Category[];
  children: ReactNode;
}

export function CategoriesProvider({ value, children }: Props) {
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}

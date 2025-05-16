import { SiteSetting } from "@/lib/types";
import { createContext, useContext } from "react";

// Khởi tạo context với default là undefined
export const SettingContext = createContext<SiteSetting | undefined>(undefined);

export function useSetting() {
  const context = useContext(SettingContext);
  if (!context) {
    throw new Error("useSetting must be used within SettingProvider");
  }
  return context;
}

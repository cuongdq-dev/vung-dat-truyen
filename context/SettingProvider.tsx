"use client";

import { SiteSetting } from "@/lib/types";
import { ReactNode } from "react";
import { SettingContext } from "./SettingContext";

interface Props {
  value: SiteSetting;
  children: ReactNode;
}

export function SettingProvider({ value, children }: Props) {
  return (
    <SettingContext.Provider value={value}>{children}</SettingContext.Provider>
  );
}

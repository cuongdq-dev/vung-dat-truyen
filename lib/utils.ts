import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Dayjs } from "dayjs";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Docs: https://day.js.org/docs/en/display/format
 */
export const formatStr = {
  dateTime: "DD MMM YYYY h:mm a", // 17 Apr 2022 12:00 am
  date: "DD MMM YYYY", // 17 Apr 2022
  time: "h:mm a", // 12:00 am
  split: {
    dateTime: "DD/MM/YYYY h:mm a", // 17/04/2022 12:00 am
    date: "DD/MM/YYYY", // 17/04/2022
  },
  paramCase: {
    dateTime: "DD-MM-YYYY h:mm a", // 17-04-2022 12:00 am
    date: "DD-MM-YYYY", // 17-04-2022
  },
};

/**
 * Hiển thị thời gian gần đây:
 * - Nếu < 60 phút → "20 phút trước"
 * - Nếu < 24 giờ → "3 giờ trước"
 * - Nếu < 3 ngày → "2 ngày trước"
 * - Nếu >= 3 ngày → Hiển thị theo fDate()
 */
export type DatePickerFormat =
  | Dayjs
  | Date
  | string
  | number
  | null
  | undefined;

// ----------------------------------------------------------------------

/** output: 17 Apr 2022 12:00 am
 */
export function fDateTime(date: DatePickerFormat, format?: string) {
  if (!date) {
    return null;
  }

  const isValid = dayjs(date).isValid();

  return isValid
    ? dayjs(date).format(format ?? formatStr.dateTime)
    : "Invalid time value";
}

export function fRelativeTime(date: DatePickerFormat) {
  if (!date) {
    return null;
  }

  const isValid = dayjs(date).isValid();
  if (!isValid) return "Invalid time value";

  const now = dayjs();
  const inputDate = dayjs(date);
  const diffMinutes = now.diff(inputDate, "minute");
  const diffHours = now.diff(inputDate, "hour");
  const diffDays = now.diff(inputDate, "day");

  if (diffMinutes < 60) {
    return `${diffMinutes} phút trước`;
  } else if (diffHours < 24) {
    return `${diffHours} giờ trước`;
  } else if (diffDays < 3) {
    return `${diffDays} ngày trước`;
  } else {
    return fDate(date); // Hiển thị dạng ngày nếu > 3 ngày
  }
}

/** output: 17 Apr 2022
 */
export function fDate(date: DatePickerFormat, format?: string) {
  if (!date) {
    return null;
  }

  const isValid = dayjs(date).isValid();

  return isValid
    ? dayjs(date).format(format ?? formatStr.date)
    : "Invalid time value";
}

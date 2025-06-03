import { formatDistanceToNow, parseISO, format } from "date-fns";
import { vi } from "date-fns/locale";

export const getDateDistance = (date: string) => {
  if (!date) return "";
  return formatDistanceToNow(parseISO(date), {
    addSuffix: true,
    locale: vi, // Sử dụng tiếng Việt
  });
};

export const formatDate = (
  date: string,
  formatDate: "long" | "short" = "long"
) => {
  const parseDate = parseISO(date);
  if (formatDate === "short") {
    return format(parseDate, "MMMM dd, yyyy", { locale: vi });
  }

  return format(parseDate, "EEEE, d MMMM, y h:mm a", { locale: vi });
};

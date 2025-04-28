import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const formatDate = (iso: string): string => {
  const date = new Date(iso);
  
  if (isNaN(date.getTime())) {
    console.warn(`Invalid date: ${iso}`);
    return "Invalid date";
  }

  // Force UTC timezone to prevent day-shifting
  return date.toLocaleDateString("en-US", {
    timeZone: "UTC", // Critical for preserving the original date
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

  export const capitalizeFirst = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  export const formatData = (text?: string  ) =>
    (text ?? "").split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  

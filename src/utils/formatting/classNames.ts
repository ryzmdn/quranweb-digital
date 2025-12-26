import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine clsx and tailwind-merge for optimal className handling
 * @param classes - Multiple class values to merge
 * @returns Merged and deduplicated class string
 */
export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(classes));
}

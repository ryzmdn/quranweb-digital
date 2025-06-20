import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function clss(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}

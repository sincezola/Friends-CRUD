import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string using clsx and merges Tailwind classes.
 *
 * @param inputs - Class names or conditional objects.
 * @returns A single string with merged and deduplicated class names.
 */
export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs));
}

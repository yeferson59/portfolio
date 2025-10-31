/**
 * Utility function to build className strings
 * Filters out falsy values and joins the remaining classes
 */
export function classNames(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}

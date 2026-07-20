/**
 * Escape a string for safe interpolation into HTML text or attribute
 * values. Unlike the DOM-based `div.innerHTML` trick, this also escapes
 * quotes, so the result is safe inside double-quoted attributes.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

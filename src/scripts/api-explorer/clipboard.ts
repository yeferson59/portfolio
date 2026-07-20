/**
 * Clipboard helper with a fallback for browsers or contexts where the
 * async Clipboard API is unavailable.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // Try modern clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback for older browsers or non-secure contexts
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    // Use the deprecated method as last resort
    return new Promise((resolve) => {
      try {
        const successful = (document as any).execCommand("copy");
        document.body.removeChild(textArea);
        resolve(successful);
      } catch {
        document.body.removeChild(textArea);
        resolve(false);
      }
    });
  } catch (error) {
    console.warn("Copy to clipboard failed:", error);
    return false;
  }
}

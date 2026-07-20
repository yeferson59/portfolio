import { APIExplorerController } from "./controller";

/** Instantiate the explorer controller once the DOM is ready. */
export function initAPIExplorer() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      new APIExplorerController();
    });
  } else {
    new APIExplorerController();
  }
}

// Test setup file
import { beforeEach } from "vitest";

// Reset DOM state before each test (only when a DOM environment is active)
beforeEach(() => {
  if (typeof document !== "undefined") {
    document.head.innerHTML = "";
    document.body.innerHTML = "";
  }
});

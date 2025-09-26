// Test setup file
import { beforeEach } from "vitest";

// Reset DOM state before each test
beforeEach(() => {
  document.head.innerHTML = "";
  document.body.innerHTML = "";
});
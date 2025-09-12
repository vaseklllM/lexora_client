import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";

// Optional: cleans up `render` after each test
afterEach(() => {
  cleanup();
});

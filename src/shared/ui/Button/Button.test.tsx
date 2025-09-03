import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "bun:test";
import { Button } from "./Button";

describe("Button", () => {
  test("renders label", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});

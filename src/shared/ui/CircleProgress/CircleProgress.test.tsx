import { render, screen } from "@testing-library/react";
import { CircleProgress } from "./CircleProgress";

describe("CircleProgress", () => {
  it("should return null when value is not a number", () => {
    const { container } = render(<CircleProgress value={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it("should render with given value", () => {
    render(<CircleProgress value={50} />);

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toBeInTheDocument();
  });

  it("should display correct rounded value", () => {
    render(<CircleProgress value={75} />);

    const progressbar = screen.getByRole("progressbar");

    expect(progressbar).toHaveTextContent("8");
  });

  it("should have correct aria-valuenow attribute", () => {
    render(<CircleProgress value={30} />);

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("aria-valuenow", "30");
  });

  it("should render with zero value", () => {
    render(<CircleProgress value={0} />);

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveTextContent("0");
    expect(progressbar).toHaveAttribute("aria-valuenow", "0");
  });

  it("should render with 100 value", () => {
    render(<CircleProgress value={100} />);

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveTextContent("10");
    expect(progressbar).toHaveAttribute("aria-valuenow", "100");
  });

  it("should apply custom className", () => {
    render(<CircleProgress value={50} className="custom-class" />);

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveClass("custom-class");
  });

  it("should have correct CSS custom properties", () => {
    render(<CircleProgress value={45} />);

    const progressbar = screen.getByRole("progressbar");
    const style = progressbar.style;

    expect(style.getPropertyValue("--value")).toBe("45");
    expect(style.getPropertyValue("--size")).toBe("30px");
    expect(style.getPropertyValue("--thickness")).toBe("2px");
  });

  it("should match snapshot with value 0", () => {
    const { container } = render(<CircleProgress value={0} />);
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with value 50", () => {
    const { container } = render(<CircleProgress value={50} />);
    expect(container).toMatchSnapshot();
  });

  it("should match snapshot with value 100", () => {
    const { container } = render(<CircleProgress value={100} />);
    expect(container).toMatchSnapshot();
  });
});

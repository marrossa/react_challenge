import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button";

const colors = {
  success: "success",
  error: "error",
};

describe("Button", () => {
  Object.keys(colors).forEach((color) => {
    it(`should render ${color} button`, () => {
      render(<Button color={color}>Test Button</Button>);
      expect(screen.getByRole("button")).toHaveClass(
        `button--${colors[color]}`
      );
      expect(screen.getByRole("button")).toHaveTextContent("Test Button");
    });
  });

  it("should render a disabled button", () => {
    render(<Button disabled={true}>Test Button</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Test Button");
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("should triggers the onClick action", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Test Button</Button>);

    userEvent.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

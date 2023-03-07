import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Breakpoints from "./Breakpoints";

describe("Breakpoints", () => {
  it("renders Breakpoints component", () => {
    render(<Breakpoints />);
    expect(screen.getByLabelText("use Breakpoints?")).toBeInTheDocument();
  });

  it("renders Breakpoints component with breakpoints enabled", () => {
    render(
      <Breakpoints useBreakpoints={true} onToggleBreakpoints={() => {}} />
    );
    expect(screen.getByLabelText("use Breakpoints?")).toBeInTheDocument();
    expect(screen.getByText("Current breakpoints values:")).toBeInTheDocument();
  });

  it("renders Breakpoints component with disabled props", () => {
    render(
      <Breakpoints
        useBreakpoints={true}
        onToggleBreakpoints={() => {}}
        disabled={true}
      />
    );
    expect(screen.getByRole("checkbox")).toBeDisabled();
    expect(screen.getByPlaceholderText("10, 30, 60")).toBeDisabled();
  });

  it("triggers the onToggleBreakpoints action", () => {
    const onToggleBreakpoints = jest.fn();
    render(<Breakpoints onToggleBreakpoints={onToggleBreakpoints} />);

    userEvent.click(screen.getByRole("checkbox"));

    expect(onToggleBreakpoints).toHaveBeenCalledTimes(1);
  });

  it("triggers the onUpdateBreakpoints action", () => {
    const onUpdateBreakpoints = jest.fn();
    render(
      <Breakpoints
        useBreakpoints={true}
        onToggleBreakpoints={() => {}}
        onUpdateBreakpoints={onUpdateBreakpoints}
      />
    );

    fireEvent.blur(screen.getByPlaceholderText("10, 30, 60"), {
      target: { value: "5, 40, 60" },
    });

    expect(onUpdateBreakpoints).toHaveBeenCalledTimes(1);
  });
});

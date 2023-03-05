import React from "react";
import { render, screen } from "@testing-library/react";
import ProgressBar from "./ProgressBar";

describe("ProgressBar", () => {
  it("renders with progress", () => {
    render(<ProgressBar progress={70} />);

    expect(screen.getByText("70%")).toBeInTheDocument();
  });

  it("should disappears after the progress completes", () => {
    render(<ProgressBar progress={100} />);

    expect(screen.getByTestId("progress-bar")).toHaveStyle("opacity: 0");
  });
});

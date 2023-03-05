import React from "react";
import { render, screen } from "@testing-library/react";
import Solution from "./Solution";

describe("Solution", () => {
  it("renders without exploding", () => {
    render(<Solution />);

    expect(screen.getByText("START REQUEST")).toBeInTheDocument();
    expect(screen.getByText("FINISH REQUEST")).toBeInTheDocument();
    expect(screen.getByText("0%")).toBeInTheDocument();
  });
});

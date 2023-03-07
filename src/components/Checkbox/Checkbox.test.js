import React from "react";
import { render, screen } from "@testing-library/react";
import Checkbox from "./Checkbox";
import userEvent from "@testing-library/user-event";

describe("Checkbox", () => {
  it("renders a checkbox", () => {
    render(<Checkbox label="test" />);
    expect(
      screen.getByRole("checkbox", { checked: false })
    ).toBeInTheDocument();
  });

  it("renders a disabled checkbox", () => {
    render(<Checkbox label="test" disabled={true} />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("renders a checked checkbox", () => {
    render(<Checkbox label="test" value={true} onChange={() => {}}/>);
    expect(screen.getByRole("checkbox", { checked: true })).toBeInTheDocument();
  });

  it("triggers the onChange action", () => {
    const onChange = jest.fn();
    render(<Checkbox label="test" onChange={onChange}/>);

    userEvent.click(screen.getByRole("checkbox"));

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});

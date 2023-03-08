import React from "react";
import Checkbox from "../../../components/Checkbox";
import "./Breakpoints.scss";

const Breakpoints = ({
  breakpoints = [],
  disabled,
  useBreakpoints,
  onToggleBreakpoints,
  onUpdateBreakpoints,
}) => {
  const handleBreakpointsChange = (e) => {
    const newBreakpoints = e.target.value;
    if (newBreakpoints) {
      onUpdateBreakpoints(newBreakpoints);
    }
  };

  return (
    <div className="breakpoints">
      <Checkbox
        className="breakpoints__checkbox"
        label="use Breakpoints?"
        disabled={disabled}
        value={useBreakpoints}
        onChange={onToggleBreakpoints}
      />
      {useBreakpoints && (
        <div className="breakpoints__fields">
          <input
            type="text"
            className="breakpoints__input"
            placeholder="10, 30, 60"
            disabled={disabled}
            onBlur={handleBreakpointsChange}
          />
          <div className="breakpoints__values">
            Current breakpoints values: {breakpoints.join(", ")}
          </div>
        </div>
      )}
    </div>
  );
};

export default Breakpoints;

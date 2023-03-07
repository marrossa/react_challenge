import React from "react";
import "./Checkbox.scss";

const Checkbox = ({ label, value, disabled, onChange }) => {
  return (
    <div className="checkbox">
      <label>
        <input
          className="checkbox__input"
          type="checkbox"
          checked={value}
          onChange={onChange}
          disabled={disabled}
        />
        <span className="checkbox__label">{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;

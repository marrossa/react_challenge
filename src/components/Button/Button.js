import React from "react";
import "./Button.scss";

const Button = ({ children, color, disabled, onClick }) => {
  return (
    <button
      className={`button ${color ? `button--${color}` : ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

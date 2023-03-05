import React from "react";
import "./ProgressBar.scss";

const ProgressBar = ({ progress }) => {
  return (
    <div
      className="progress-bar"
      data-testid="progress-bar"
      style={{ opacity: progress === 100 ? 0 : 1 }}
    >
      <div className="progress-bar__filler" style={{ width: progress + "%" }}>
        <span className="progress-bar__label">{`${progress}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;

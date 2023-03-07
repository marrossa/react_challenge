import React, { useState, useEffect } from "react";
import Button from "../../../components/Button";
import ProgressBar from "../../../components/ProgressBar";
import "./Solution.scss";

const HANGING_BREAKPOINT = 90;
const PROGRESS_PER_SECOND = 6; // For a 15s request hanging at 90%, we need to increase 6% every second

const Solution = () => {
  const [isRequestActive, setIsRequestActive] = useState(false);
  const [, setIsRequestCompleted] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    if (isRequestActive && currentProgress < HANGING_BREAKPOINT) {
      const timer = setInterval(() => {
        setCurrentProgress(
          (prevCurrentProgress) => prevCurrentProgress + PROGRESS_PER_SECOND
        );
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isRequestActive, currentProgress]);

  const handleStartRequest = () => {
    if (!isRequestActive) {
      setIsRequestActive(true);
      setCurrentProgress(0);
      setIsRequestCompleted(false);
    }
  };

  const handleFinishRequest = () => {
    setIsRequestActive(false);
    setIsRequestCompleted(true);
    setCurrentProgress(100);
  };

  return (
    <div className="solution">
      <ProgressBar progress={currentProgress} />
      <div className="solution__actions">
        <Button
          color="success"
          onClick={handleStartRequest}
          disabled={isRequestActive}
        >
          {isRequestActive ? "LOADING..." : "START REQUEST"}
        </Button>
        <Button color="error" onClick={handleFinishRequest}>
          FINISH REQUEST
        </Button>
      </div>
    </div>
  );
};

export default Solution;

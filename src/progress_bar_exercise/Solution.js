import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import ProgressBar from "../components/ProgressBar";
import "./Solution.scss";

const REQUEST_TIMEOUT_SECONDS = 15;
const HANGING_BREAKPOINT = 90;

const Solution = () => {
  const [isRequestActive, setIsRequestActive] = useState(false);
  const [isRequestCompleted, setIsRequestCompleted] = useState(false);
  const [currentRequestTime, setCurrentRequestTime] = useState(0);

  useEffect(() => {
    if (isRequestActive && currentRequestTime < REQUEST_TIMEOUT_SECONDS) {
      const timer = setInterval(() => {
        setCurrentRequestTime(
          (prevCurrentRequestTime) => prevCurrentRequestTime + 1
        );
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isRequestActive, currentRequestTime]);

  const handleStartRequest = () => {
    if (!isRequestActive) {
      setIsRequestActive(true);
      setCurrentRequestTime(0);
      setIsRequestCompleted(false);
    }
  };

  const handleFinishRequest = () => {
    setIsRequestActive(false);
    setIsRequestCompleted(true);
  };

  const calculateProgress = () => {
    if (isRequestCompleted) {
      return 100;
    }
    return (currentRequestTime * HANGING_BREAKPOINT) / REQUEST_TIMEOUT_SECONDS;
  };

  return (
    <div className="solution">
      <ProgressBar progress={calculateProgress()} />
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

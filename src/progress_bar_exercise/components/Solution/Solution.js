import React, { useState, useEffect } from "react";
import Button from "../../../components/Button";
import ProgressBar from "../../../components/ProgressBar";
import Breakpoints from "../Breakpoints/Breakpoints";
import "./Solution.scss";

const HANGING_BREAKPOINT = 90;
const PROGRESS_PER_SECOND = 6; // For a 15s request hanging at 90%, we need to increase 6% every second

const Solution = () => {
  const [isRequestActive, setIsRequestActive] = useState(false);
  const [, setIsRequestCompleted] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [useBreakpoints, setUseBreakpoints] = useState(false);
  const [breakpoints, setBreakpoints] = useState([]);

  useEffect(() => {
    if (isRequestActive && currentProgress < HANGING_BREAKPOINT) {
      const timer = setInterval(() => {
        setCurrentProgress((prevCurrentProgress) => {
          const newCurrentProgress = prevCurrentProgress + PROGRESS_PER_SECOND;
          const newBreakpointCurrentProgress = prevCurrentProgress + PROGRESS_PER_SECOND / 2;
          let isBreakpoint = false;

          if (useBreakpoints) {
            isBreakpoint = breakpoints.some(
              (breakpoint) =>
                breakpoint >= prevCurrentProgress &&
                breakpoint <= newCurrentProgress
            );
          }

          if (isBreakpoint && newBreakpointCurrentProgress < HANGING_BREAKPOINT) {
            return newBreakpointCurrentProgress
          } else if (!isBreakpoint && newCurrentProgress < HANGING_BREAKPOINT) {
            return newCurrentProgress;
          }
          return HANGING_BREAKPOINT;
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isRequestActive, currentProgress, useBreakpoints, breakpoints]);

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

  const toggleBreakpoints = () => {
    setUseBreakpoints((prevUseBreakpoints) => !prevUseBreakpoints);
  };

  const updateBreakpoints = (values) => {
    const newBreakpoints = values
      .replace(" ", "")
      .split(",")
      .map((value) => parseInt(value, 10))
      .filter((value) => value > 0 && value < HANGING_BREAKPOINT)
      .sort((a, b) => a - b);
    setBreakpoints(newBreakpoints);
  };

  return (
    <div className="solution">
      <ProgressBar progress={currentProgress} />
      <Breakpoints
        breakpoints={breakpoints}
        useBreakpoints={useBreakpoints}
        onToggleBreakpoints={toggleBreakpoints}
        onUpdateBreakpoints={updateBreakpoints}
        disabled={isRequestActive}
      />
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

import React, { useState, useEffect } from "react";
import { HANGING_BREAKPOINT, PROGRESS_PER_SECOND} from '../../constants';
import { getBreakpoints } from '../../utils';
import Button from "../../../components/Button";
import ProgressBar from "../../../components/ProgressBar";
import Breakpoints from "../Breakpoints/Breakpoints";
import "./Solution.scss";

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
    setBreakpoints(getBreakpoints(values));
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

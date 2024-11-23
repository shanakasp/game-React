import React, { useEffect, useState } from "react";
const ProgressBar = ({
  duration,
  isRunning,
  onComplete,
  startTime,
  isPaused,
}) => {
  const [progress, setProgress] = useState(100);
  const [pausedTime, setPausedTime] = useState(null);
  const [pausedAt, setPausedAt] = useState(null);
  const [adjustedStartTime, setAdjustedStartTime] = useState(startTime);

  useEffect(() => {
    // When pausing
    if (isPaused) {
      setPausedAt(Date.now());
      setPausedTime(progress);
      return;
    }

    // When resuming
    if (!isPaused && pausedAt !== null) {
      const pauseDuration = Date.now() - pausedAt;
      setAdjustedStartTime((prev) => prev + pauseDuration);
      setPausedAt(null);
    }

    if (!isRunning || pausedTime === 0) {
      return;
    }

    const timer = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - adjustedStartTime;
      const percentage = Math.max(0, 100 - (elapsedTime / duration) * 100);

      setProgress(percentage);

      if (percentage <= 0) {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, 16);

    return () => clearInterval(timer);
  }, [
    isRunning,
    duration,
    onComplete,
    isPaused,
    adjustedStartTime,
    pausedTime,
  ]);

  // Reset states when starting new question
  useEffect(() => {
    setProgress(100);
    setPausedTime(null);
    setPausedAt(null);
    setAdjustedStartTime(startTime);
  }, [startTime]);

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-3/4 h-5 bg-white dark:bg-[#aeafaf] rounded-full overflow-hidden align-middle">
        <div
          className="h-full bg-[#EE6C6A] dark:bg-[#2A2727] transition-all ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
export default ProgressBar;

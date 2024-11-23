import React, { useEffect, useState } from "react";

const ProgressBar = ({ duration, isRunning, onComplete, startTime }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const remainingTime = Math.max(0, duration - elapsedTime);
    const intervalDuration = duration || 10000;

    const timer = setInterval(() => {
      const currentElapsedTime = Date.now() - startTime;
      const percentage = Math.max(
        0,
        100 - (currentElapsedTime / intervalDuration) * 100
      );

      setProgress(percentage);

      if (currentElapsedTime >= intervalDuration) {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isRunning, duration, onComplete, startTime]);

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

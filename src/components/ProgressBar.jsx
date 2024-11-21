import React, { useEffect, useState } from "react";

const ProgressBar = ({ duration, isRunning, onComplete }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isRunning) {
      setProgress(100); // Reset progress if timer stops
      return;
    }

    const startTime = Date.now();
    const intervalDuration = duration || 10000; // Default to 10 seconds
    const timer = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const percentage = Math.max(
        0,
        100 - (elapsedTime / intervalDuration) * 100
      );

      setProgress(percentage);

      if (elapsedTime >= intervalDuration) {
        clearInterval(timer);
        if (onComplete) onComplete(); // Callback when the timer completes
      }
    }, 16); // 60 FPS for smooth updates

    return () => clearInterval(timer);
  }, [isRunning, duration, onComplete]);

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-3/4 h-5 bg-[#aeafaf] rounded-full overflow-hidden align-middle">
        <div
          className="h-full bg-[#EE6C6A] dark:bg-[#2A2727] transition-all ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

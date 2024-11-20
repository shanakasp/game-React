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
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-500 transition-all ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;

import React, { useState, useEffect } from 'react';
import { useTheme } from '../Context/ThemeContext';

interface ProgressBarProps {
  onComplete: () => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ onComplete }) => {
  const { darkMode } = useTheme();
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState('3:00:00');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const totalSeconds = 3 * 60 * 60; // 3 hours in seconds
    let currentSeconds = 0;
    const interval = setInterval(() => {
      currentSeconds += 1;
      const newProgress = (currentSeconds / totalSeconds) * 100;
      setProgress(newProgress);

      // Calculate time left
      const hoursLeft = Math.floor((totalSeconds - currentSeconds) / 3600);
      const minutesLeft = Math.floor(((totalSeconds - currentSeconds) % 3600) / 60);
      const secondsLeft = (totalSeconds - currentSeconds) % 60;
      setTimeLeft(`${hoursLeft}:${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`);

      if (currentSeconds >= totalSeconds) {
        clearInterval(interval);
        setIsComplete(true);
        onComplete();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed bottom-4 right-4 z-50 w-80 ${darkMode ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-lg`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          Service Progress
        </h3>
        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {timeLeft} remaining
        </span>
      </div>
      
      <div className={`w-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full overflow-hidden`}>
        <div 
          className={`h-full ${isComplete ? 'bg-green-500' : 'bg-blue-500'} transition-all duration-1000`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-2 flex justify-between items-center">
        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {isComplete ? 'Service Completed!' : 'In Progress...'}
        </span>
        <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

export default ProgressBar; 
import React from 'react';

interface LoadingBarProps {
  progress: number;
}

export default function LoadingBar({ progress }: LoadingBarProps) {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className="h-full bg-indigo-600 transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
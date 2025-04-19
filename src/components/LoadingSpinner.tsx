import React from 'react';
import { useTheme } from '../Context/ThemeContext';

const LoadingSpinner: React.FC = () => {
  const { darkMode } = useTheme();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <span className={`text-lg ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 
import React, { useState, useEffect } from 'react';
import { useTheme } from '../Context/ThemeContext';
import { ArrowUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const { darkMode } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-8 left-8 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`p-2 rounded-full shadow-lg transition-all duration-300 ${
            darkMode
              ? 'bg-gray-800 text-white hover:bg-gray-700'
              : 'bg-white text-gray-800 hover:bg-gray-100'
          }`}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTop; 
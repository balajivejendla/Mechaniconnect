import React, { useState, useEffect } from 'react';
import { useTheme } from '../Context/ThemeContext';

interface CaptchaProps {
  onValidate: (isValid: boolean) => void;
}

const Captcha: React.FC<CaptchaProps> = ({ onValidate }) => {
  const { darkMode } = useTheme();
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [rotation, setRotation] = useState(0);

  const generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setCaptchaText(result);
    setRotation(Math.floor(Math.random() * 30) - 15);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setUserInput(value);
    onValidate(value === captchaText);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium mb-2">
        Verify Captcha
      </label>
      <div className="flex items-center space-x-4">
        <div 
          className={`p-4 font-mono text-xl tracking-wider select-none
            ${darkMode 
              ? 'bg-gray-700 text-gray-200' 
              : 'bg-gray-100 text-gray-800'}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {captchaText}
        </div>
        <button 
          onClick={generateCaptcha}
          type="button"
          className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700
            ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
        >
          ↻
        </button>
      </div>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Enter captcha text"
        className={`w-full p-3 rounded-lg border
          ${darkMode 
            ? 'bg-gray-700 border-gray-600 text-white' 
            : 'bg-white border-gray-300 text-gray-900'}`}
        maxLength={6}
      />
    </div>
  );
};

export default Captcha;
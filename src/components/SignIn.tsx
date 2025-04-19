import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';

import { Eye, EyeOff } from 'lucide-react';
import Captcha from '../components/Captcha';

const SignIn: React.FC = () => {
    const { darkMode } = useTheme();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
    const [isCaptchaValid, setIsCaptchaValid] = useState(false);
    const [error, setError] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!isCaptchaValid) {
        setError('Please complete the captcha correctly');
        return;
      }
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      // Add your authentication logic here
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-12 
      ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className={`max-w-md w-full space-y-8 p-8 rounded-xl shadow-lg 
        ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        
        <div className="text-center">
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
            Sign in to your account
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email field */}
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`w-full p-3 rounded-lg border
                ${darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'}`}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password field */}
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className={`w-full p-3 rounded-lg border
                ${darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'}`}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Captcha component */}
          <Captcha onValidate={setIsCaptchaValid} />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={!isCaptchaValid}
            className={`w-full p-3 rounded-lg font-medium text-white
              ${isCaptchaValid 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-400 cursor-not-allowed'}
              transition-colors duration-200`}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
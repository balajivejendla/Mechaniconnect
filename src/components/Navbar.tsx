import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wrench, LogOut, Moon, Sun, ShoppingCart, Phone, Star, Menu, X, Settings, HelpCircle, LogIn } from 'lucide-react';import { useTheme } from '../Context/ThemeContext';
import UserSettings from './UserSettings';

interface NavbarProps {
  orderCount: number;
  onOrdersClick: () => void;
  onNavigate: () => void;
  onSectionChange: (section: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ orderCount, onOrdersClick, onNavigate, onSectionChange }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    onNavigate();
    navigate(path);
  };

  const handleSignOut = () => {
    // Remove any local storage items if needed
    localStorage.removeItem('user');
    navigate('/signin');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onSectionChange(sectionId);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-gray-900' : 'bg-white'} shadow-md transition-colors duration-200`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Wrench className={`h-6 w-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              MechaniConnect
            </span>
          </Link>
          <Link
  to="/signin"
  className={`flex items-center space-x-2 px-4 py-2 rounded-lg 
    ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} 
    text-white transition-colors duration-200`}
>
  <LogIn className="h-5 w-5" />
  <span>Sign In</span>
</Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
              Home
            </Link>
            <button
              onClick={() => scrollToSection('services')}
              className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
            >
              Reviews
            </button>
            <button
              onClick={() => handleNavigation('/contact')}
              className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
            >
              Contact
            </button>
            <button
              onClick={() => handleNavigation('/settings')}
              className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
            >
              <Settings className="h-5 w-5" />
            </button>
            <button
              onClick={toggleDarkMode}
              className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
            >
              {darkMode ? '🌞' : '🌙'}
            </button>
            <button
              onClick={onOrdersClick}
              className="relative"
            >
              <ShoppingCart className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
              {orderCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {orderCount}
                </span>
              )}
            </button>
            <button
              onClick={() => onSectionChange('booking')}
              className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
            >
              <HelpCircle className="h-5 w-5" />
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? (
              <X className={`h-6 w-6 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${darkMode ? 'text-white' : 'text-gray-800'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-colors duration-200`}>
          <div className="px-4 py-2 space-y-2">
            <Link
              to="/"
              className={`block ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
  to="/signin"
  className={`block w-full text-left flex items-center space-x-2 px-2 py-2
    ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} 
    transition-colors duration-200`}
  onClick={() => setIsMenuOpen(false)}
>
  <LogIn className="h-5 w-5" />
  <span>Sign In</span>
</Link>
            <button
              onClick={() => {
                scrollToSection('services');
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
            >
              Services
            </button>
            <button
              onClick={() => {
                scrollToSection('testimonials');
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
            >
              Reviews
            </button>
            <button
              onClick={() => {
                handleNavigation('/contact');
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
            >
              Contact
            </button>
            <button
              onClick={() => {
                handleNavigation('/settings');
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
            >
              Settings
            </button>
            <button
              onClick={toggleDarkMode}
              className={`block w-full text-left ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            <button
              onClick={() => {
                onSectionChange('booking');
                setIsMenuOpen(false);
              }}
              className={`block w-full text-left ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}
            >
              Help
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
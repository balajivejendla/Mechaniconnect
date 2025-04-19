import React from 'react';
import { useTheme } from '../Context/ThemeContext';
import { HelpCircle, X, Car, MapPin, Calendar, CreditCard, Shield, Star } from 'lucide-react';

interface ContextHelpProps {
  currentSection: string;
  onClose: () => void;
}

const ContextHelp: React.FC<ContextHelpProps> = ({ currentSection, onClose }) => {
  const { darkMode } = useTheme();

  const helpContent = {
    booking: {
      title: "Booking Help",
      content: "Follow these steps to book a service:",
      steps: [
        { icon: <Car className="h-5 w-5" />, text: "Select your vehicle type" },
        { icon: <MapPin className="h-5 w-5" />, text: "Choose your location" },
        { icon: <Calendar className="h-5 w-5" />, text: "Pick a service date" }
      ]
    },
    payment: {
      title: "Payment Help",
      content: "We accept the following payment methods:",
      steps: [
        { icon: <CreditCard className="h-5 w-5" />, text: "Credit Card" },
        { icon: <Shield className="h-5 w-5" />, text: "PayPal" },
        { icon: <CreditCard className="h-5 w-5" />, text: "Bank Transfer" }
      ]
    },
    reviews: {
      title: "Reviews Help",
      content: "How to leave a review:",
      steps: [
        { icon: <Star className="h-5 w-5" />, text: "Rate your experience (1-5 stars)" },
        { icon: <HelpCircle className="h-5 w-5" />, text: "Write your feedback" },
        { icon: <Shield className="h-5 w-5" />, text: "Submit your review" }
      ]
    },
    services: {
      title: "Services Help",
      content: "Available services:",
      steps: [
        { icon: <Car className="h-5 w-5" />, text: "Regular Maintenance" },
        { icon: <Shield className="h-5 w-5" />, text: "Emergency Repairs" },
        { icon: <Star className="h-5 w-5" />, text: "Specialty Services" }
      ]
    }
  };

  const currentHelp = helpContent[currentSection as keyof typeof helpContent] || helpContent.booking;

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl p-4 max-w-sm transition-all duration-300`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {currentHelp.title}
        </h3>
        <button
          onClick={onClose}
          className={`p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200`}
        >
          <X className={`h-5 w-5 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`} />
        </button>
      </div>
      
      <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {currentHelp.content}
      </p>
      
      <ul className="space-y-3">
        {currentHelp.steps.map((step, index) => (
          <li key={index} className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
              {step.icon}
            </div>
            <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {step.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContextHelp; 
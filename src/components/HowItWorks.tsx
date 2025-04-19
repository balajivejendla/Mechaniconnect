import React from 'react';
import { Calendar, MapPin, Wrench, CheckCircle } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext';

interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const HowItWorks: React.FC = () => {
  const { darkMode } = useTheme();
  
  const steps: Step[] = [
    {
      id: 1,
      title: 'Book a Service',
      description: 'Choose the service you need and select a convenient time slot.',
      icon: <Calendar className={`h-10 w-10 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />,
    },
    {
      id: 2,
      title: 'Find Nearby Mechanics',
      description: "We'll connect you with trusted mechanics in your area.",
      icon: <MapPin className={`h-10 w-10 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />,
    },
    {
      id: 3,
      title: 'Get Your Vehicle Serviced',
      description: 'Our certified mechanics will perform the requested service.',
      icon: <Wrench className={`h-10 w-10 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />,
    },
    {
      id: 4,
      title: 'Enjoy Peace of Mind',
      description: 'Receive detailed reports and maintenance reminders.',
      icon: <CheckCircle className={`h-10 w-10 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />,
    },
  ];

  return (
    <section 
      id="how-it-works" 
      className={`py-16 transition-colors duration-200 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            How It Works
          </h2>
          <p className={`text-xl max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Simple steps to get your vehicle serviced with MechaniConnect
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`rounded-lg p-6 shadow-md text-center transition-all duration-200 hover:shadow-lg ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="flex justify-center mb-4">
                {step.icon}
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {step.title}
              </h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <button 
            className={`py-3 px-8 rounded-md text-lg font-medium transition-colors duration-200 ${
              darkMode 
                ? 'bg-blue-700 hover:bg-blue-600 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            Book a Service Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
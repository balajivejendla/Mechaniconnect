import React from 'react';
import { Wrench, AlertTriangle, Droplet, Battery, Thermometer, Gauge } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext';

const ServiceCards = () => {
  const { darkMode } = useTheme();
  
  const services = [
    {
      id: 1,
      title: 'Regular Maintenance',
      description: 'Keep your vehicle in top condition with scheduled maintenance services.',
      icon: <Wrench className={`h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />,
      color: darkMode ? 'bg-blue-900/30' : 'bg-blue-50',
    },
    {
      id: 2,
      title: 'Diagnostics & Repair',
      description: 'Professional diagnostics and repair services for all vehicle issues.',
      icon: <AlertTriangle className={`h-8 w-8 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />,
      color: darkMode ? 'bg-red-900/30' : 'bg-red-50',
    },
    {
      id: 3,
      title: 'Oil & Fluids',
      description: 'Oil changes and fluid top-ups to keep your engine running smoothly.',
      icon: <Droplet className={`h-8 w-8 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />,
      color: darkMode ? 'bg-green-900/30' : 'bg-green-50',
    },
    {
      id: 4,
      title: 'Battery Services',
      description: 'Battery testing, charging, and replacement services.',
      icon: <Battery className={`h-8 w-8 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />,
      color: darkMode ? 'bg-yellow-900/30' : 'bg-yellow-50',
    },
    {
      id: 5,
      title: 'AC Service & Repair',
      description: 'Keep your vehicle cool with our AC maintenance and repair services.',
      icon: <Thermometer className={`h-8 w-8 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />,
      color: darkMode ? 'bg-purple-900/30' : 'bg-purple-50',
    },
    {
      id: 6,
      title: 'Tire Services',
      description: 'Tire rotation, balancing, and replacement services for a smooth ride.',
      icon: <Gauge className={`h-8 w-8 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />,
      color: darkMode ? 'bg-indigo-900/30' : 'bg-indigo-50',
    },
  ];

  return (
    <section id="services" className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-200`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>Our Services</h2>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Comprehensive vehicle maintenance and repair services to keep you on the road
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className={`${service.color} rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300 ${darkMode ? 'shadow-gray-800' : 'shadow-gray-200'}`}
            >
              <div className="mb-4">
                {service.icon}
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {service.title}
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                {service.description}
              </p>
              <button className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} font-medium flex items-center transition`}>
                Learn more
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;
import React, { useState } from 'react';
import { Search, Car, MapPin } from 'lucide-react';
const Hero = () => {
  const [vehicleType, setVehicleType] = useState('car');
  const [location, setLocation] = useState('');

  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-white-800 text-white py-16 md:py-24">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Expert Vehicle Maintenance & Repair Services
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Book trusted mechanics, track maintenance, and keep your vehicle in perfect condition
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 text-left">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
              <div className="flex-1 mb-4 md:mb-0">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Vehicle Type
                </label>
                <div className="flex space-x-2">
                  <button 
                    className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center space-x-2 ${
                      vehicleType === 'car' 
                        ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                        : 'bg-gray-100 text-gray-700 border border-gray-300'
                    }`}
                    onClick={() => setVehicleType('car')}
                  >
                    <Car className="h-5 w-5" />
                    <span>Car</span>
                  </button>
                  <button 
                    className={`flex-1 py-2 px-3 rounded-md flex items-center justify-center space-x-2 ${
                      vehicleType === 'bike' 
                        ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                        : 'bg-gray-100 text-gray-700 border border-gray-300'
                    }`}
                    onClick={() => setVehicleType('bike')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5.5 17a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm13 0a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"></path>
                      <path d="M15 6h5"></path>
                      <path d="M12 6h-3"></path>
                      <path d="M8 6H5.5C4.12 6 3 7.12 3 8.5V17"></path>
                      <path d="M6 9h7l1 3h4"></path>
                    </svg>
                    <span>Bike</span>
                  </button>
                </div>
              </div>
              
              <div className="flex-1 mb-4 md:mb-0">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input 
                    type="text" 
                    placeholder="Enter your location"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
              
              <button className="bg-blue-500 hover:bg-blue-400 text-white py-3 px-6 rounded-md flex items-center justify-center transition">
                <Search className="h-5 w-5 mr-2" />
                <span>Find Services</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
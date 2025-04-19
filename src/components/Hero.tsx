import React, { useState, useEffect, useRef } from 'react';
import { Search, Car, MapPin, Star, Phone, AlertCircle, X, CheckCircle, ShoppingCart, Calendar, Wrench, AlertTriangle, Shield, Clock } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext';
import ProgressBar from './ProgressBar';
import { usePreferences } from '../Context/PreferencesContext';
import ServiceCalendar from './ServiceCalendar';
interface Service {
  id: number;
  name: string;
  location: string;
  rating: number;
  distance: string;
  phone: string;
  specialties: string[];
  availability: string;
}

interface BookedService extends Service {
  bookingDate: string;
  bookingTime: string;
}

const Hero = () => {
  const { darkMode } = useTheme();
  const { preferences } = usePreferences();
  const [vehicleType, setVehicleType] = useState('car');
  const [location, setLocation] = useState(preferences.defaultLocation);
  const [showResults, setShowResults] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [sortBy, setSortBy] = useState('distance'); // 'distance' or 'rating'
  const [orderCount, setOrderCount] = useState(0);
  const [bookedServices, setBookedServices] = useState<BookedService[]>([]);
  const [showBookedServices, setShowBookedServices] = useState(false);
  const [serviceType, setServiceType] = useState('regular'); // 'regular' or 'emergency'
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const bookingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const serviceCategories = [
    {
      title: 'Maintenance',
      services: ['Oil Change', 'Brake Service', 'Tire Rotation']
    },
    {
      title: 'Repairs',
      services: ['Engine', 'Transmission', 'Electrical']
    }
  ];
  const handleTimeSlotSelect = (slot: TimeSlot) => {
    setSelectedTimeSlot(slot);
    // Update booking logic with selected time
    if (selectedService) {
      handleBooking({
        ...selectedService,
        bookingDate: slot.start.toLocaleDateString(),
        bookingTime: slot.start.toLocaleTimeString(),
      });
    }
    setShowCalendar(false);
  };
  
  // Sample service locations data
  const serviceLocations = [
    {
      id: 1,
      name: "Mike's Auto Repair",
      location: "123 Main St, Downtown",
      rating: 4.8,
      distance: "0.5 miles",
      phone: "+1 234-567-8900",
      specialties: ["Car", "Bike"],
      availability: "Available Today"
    },
    {
      id: 2,
      name: "Quick Fix Garage",
      location: "456 Oak Ave, Westside",
      rating: 4.5,
      distance: "1.2 miles",
      phone: "+1 234-567-8901",
      specialties: ["Car"],
      availability: "Available Tomorrow"
    },
    {
      id: 3,
      name: "Elite Auto Service",
      location: "789 Pine St, Eastside",
      rating: 4.9,
      distance: "0.8 miles",
      phone: "+1 234-567-8902",
      specialties: ["Car", "Bike"],
      availability: "Available Today"
    }
  ];

  // Update location when preferences change
  useEffect(() => {
    setLocation(preferences.defaultLocation);
  }, [preferences.defaultLocation]);

  const handleSearch = () => {
    setError('');
    if (!location.trim()) {
      setError('Please enter a location to find services');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call with timeout
    searchTimeoutRef.current = setTimeout(() => {
    setShowResults(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleBooking = (service: Service) => {
    setSelectedService(service);
    setShowBookingSuccess(true);
    setShowProgressBar(true);
    setOrderCount(prev => prev + 1);
    
    // Add the booked service with booking date
    const bookedService: BookedService = {
      ...service,
      bookingDate: new Date().toLocaleDateString(),
      bookingTime: new Date().toLocaleTimeString()
    };
    setBookedServices(prev => [...prev, bookedService]);
    
    // Hide the success message after 3 seconds
    bookingTimeoutRef.current = setTimeout(() => {
      setShowBookingSuccess(false);
    }, 3000);
  };

  const handleProgressComplete = () => {
    setShowProgressBar(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const sortServices = (services: Service[]) => {
    return [...services].sort((a, b) => {
      if (sortBy === 'distance') {
        const distanceA = parseFloat(a.distance);
        const distanceB = parseFloat(b.distance);
        return distanceA - distanceB;
      } else {
        return b.rating - a.rating;
      }
    });
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (bookingTimeoutRef.current) {
        clearTimeout(bookingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className={`relative min-h-[90vh] bg-gradient-to-r ${darkMode ? 'from-blue-900 to-purple-900' : 'from-blue-600 to-purple-600'} text-white`}>
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Primary Message - First thing users see */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
            Expert Auto Care When You Need It
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-12">
            Find trusted mechanics, book services, and keep your vehicle running smoothly
          </p>
        </div>

        {/* Key Benefits - Most important information first */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Shield className="h-12 w-12 text-blue-400" />,
              title: "Certified Mechanics",
              description: "100% verified professionals with years of experience"
            },
            {
              icon: <Clock className="h-12 w-12 text-blue-400" />,
              title: "24/7 Service",
              description: "Emergency support available anytime, anywhere"
            },
            {
              icon: <Star className="h-12 w-12 text-blue-400" />,
              title: "5-Star Service",
              description: "Rated by thousands of satisfied customers"
            }
          ].map((benefit, index) => (
            <div 
              key={index}
              className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800/50' : 'bg-white/10'} backdrop-blur-sm hover:scale-105 transition-transform duration-300`}
            >
              <div className="flex flex-col items-center text-center">
                {benefit.icon}
                <h3 className="text-xl font-semibold mt-4 mb-2">{benefit.title}</h3>
                <p className="text-gray-200">{benefit.description}</p>
              </div>
            </div>
          ))}
              </div>
              
        {/* Search Section */}
        <div className={`max-w-3xl mx-auto ${darkMode ? 'bg-gray-800/50' : 'bg-white/10'} backdrop-blur-sm rounded-lg p-6 shadow-xl`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Location</label>
                <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your location"
                  className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                    darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                </div>
              </div>
              <button 
                onClick={handleSearch}
              className={`px-6 py-3 rounded-lg ${
                darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
              } text-white font-semibold transition-colors duration-200`}
              >
              Find Services
              </button>
            </div>
        </div>

            {showResults && (
  <div 
  ref={resultsRef}
            className={`mt-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-4 md:p-6 transition-colors duration-200`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Available Services
              </h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Sort by:</label>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`border ${darkMode ? 'border-gray-600 bg-gray-700 text-gray-200' : 'border-gray-300 bg-white text-gray-700'} rounded-md px-2 py-1 text-sm`}
                  >
                    <option value="distance">Distance</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
                <button 
                  onClick={() => setShowResults(false)}
                  className={`${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                  aria-label="Close results"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-800'} mb-3`}>Service Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceCategories.map((category) => (
                  <div 
                    key={category.title}
                    className={`p-4 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} rounded-lg ${selectedCategory === category.title ? (darkMode ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-300') : ''}`}
                    onClick={() => setSelectedCategory(category.title)}
                  >
                    <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>{category.title}</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.services.map((service) => (
                        <span 
                          key={service}
                          className={`text-sm px-2 py-1 rounded-full ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'}`}
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {sortServices(serviceLocations).map((service) => (
                <div 
                  key={service.id}
                  className={`p-4 border ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} rounded-lg transition-colors duration-200`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{service.name}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{service.location}</p>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} ml-1`}>{service.rating}</span>
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} ml-4`}>{service.distance}</span>
                      </div>
                      <div className="flex items-center mt-1 text-sm">
                        <Phone className={`h-4 w-4 mr-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                        <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>{service.phone}</span>
                      </div>
                      <div className="mt-2">
                        <span className={`text-xs px-2 py-1 ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'} rounded-full`}>
                          {service.availability}
                        </span>
                      </div>
                    </div>
                    <button
  onClick={() => setShowCalendar(true)}
  className={`px-4 py-2 ${
    darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-400'
  } text-white rounded-md text-sm transition-colors duration-200`}
>
  Book Now
</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Booking Success Toast */}
      {showBookingSuccess && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2">
            <CheckCircle className="h-6 w-6" />
            <div>
              <p className="font-semibold">Booking Confirmed!</p>
              <p className="text-sm">Your service has been successfully booked.</p>
            </div>
            <button 
              onClick={() => setShowBookingSuccess(false)}
              className="ml-4 text-white hover:text-gray-200"
              aria-label="Close notification"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Booked Services Modal */}
      {showBookedServices && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Your Booked Services</h2>
                <button 
                  onClick={() => setShowBookedServices(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              {bookedServices.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-300">No services booked yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookedServices.map((service, index) => (
                    <div 
                      key={index}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">{service.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{service.location}</p>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">{service.rating}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 ml-4">{service.distance}</span>
                        </div>
                          <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-300">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>Booked on {service.bookingDate} at {service.bookingTime}</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-full">
                            Booked
                          </span>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      )}

      {/* Progress Bar */}
      {showProgressBar && (
        <ProgressBar onComplete={handleProgressComplete} />
      )}
      {showCalendar && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Select Appointment Time</h2>
        <button
          onClick={() => setShowCalendar(false)}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <ServiceCalendar onTimeSlotSelect={handleTimeSlotSelect} />
    </div>
  </div>
)}
    </section>
    
  );
};

export default Hero;
import React from 'react';
import { useTheme } from '../Context/ThemeContext';
import { MapPin, Bell, Sun, Moon, Clock, Car, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePreferences } from '../Context/PreferencesContext';

const UserSettings: React.FC = () => {
  const navigate = useNavigate();
  const { darkMode, toggleDarkMode } = useTheme();
  const { preferences, updatePreferences } = usePreferences();

  const handleLocationChange = (value: string) => {
    updatePreferences({ defaultLocation: value });
  };

  const handleThemeChange = (value: 'light' | 'dark' | 'system') => {
    updatePreferences({ theme: value });
    if (value === 'light') {
      toggleDarkMode();
    } else if (value === 'dark') {
      toggleDarkMode();
    }
  };

  const handleNotificationChange = (value: boolean) => {
    updatePreferences({ notifications: value });
  };

  const handleServiceTimeChange = (value: string) => {
    updatePreferences({ preferredServiceTime: value });
  };

  const handleVehicleTypeChange = (value: string) => {
    updatePreferences({ vehicleType: value });
  };

  const handleEmergencyContactChange = (value: string) => {
    updatePreferences({ emergencyContact: value });
  };

  const savePreferences = () => {
    navigate('/');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} p-6`}>
      <br/>
      <br/>
      <div className={`p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-lg max-w-2xl mx-auto`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Preferences</h2>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/')}
              className={`px-4 py-2 rounded-md ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              } text-white transition-colors duration-200`}
            >
              Cancel
            </button>
            <button
              onClick={savePreferences}
              className={`px-4 py-2 rounded-md ${
                darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
              } text-white transition-colors duration-200`}
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Location Setting */}
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center mb-2">
              <MapPin className="h-5 w-5 mr-2" />
              <label className="font-medium">Default Location</label>
            </div>
            <input
              type="text"
              value={preferences.defaultLocation}
              onChange={(e) => handleLocationChange(e.target.value)}
              placeholder="Enter your default location"
              className={`w-full p-2 rounded-md border ${
                darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          {/* Theme Setting */}
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center mb-2">
              {darkMode ? <Moon className="h-5 w-5 mr-2" /> : <Sun className="h-5 w-5 mr-2" />}
              <label className="font-medium">Theme Preference</label>
            </div>
            <select
              value={preferences.theme}
              onChange={(e) => handleThemeChange(e.target.value as 'light' | 'dark' | 'system')}
              className={`w-full p-2 rounded-md border ${
                darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="system">System Default</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          {/* Notifications Setting */}
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center mb-2">
              <Bell className="h-5 w-5 mr-2" />
              <label className="font-medium">Notifications</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={preferences.notifications}
                onChange={(e) => handleNotificationChange(e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="ml-2">Enable notifications for service updates</span>
            </div>
          </div>

          {/* Preferred Service Time */}
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center mb-2">
              <Clock className="h-5 w-5 mr-2" />
              <label className="font-medium">Preferred Service Time</label>
            </div>
            <select
              value={preferences.preferredServiceTime}
              onChange={(e) => handleServiceTimeChange(e.target.value)}
              className={`w-full p-2 rounded-md border ${
                darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="morning">Morning (8AM - 12PM)</option>
              <option value="afternoon">Afternoon (12PM - 5PM)</option>
              <option value="evening">Evening (5PM - 8PM)</option>
            </select>
          </div>

          {/* Vehicle Type */}
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center mb-2">
              <Car className="h-5 w-5 mr-2" />
              <label className="font-medium">Vehicle Type</label>
            </div>
            <select
              value={preferences.vehicleType}
              onChange={(e) => handleVehicleTypeChange(e.target.value)}
              className={`w-full p-2 rounded-md border ${
                darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="truck">Truck</option>
              <option value="suv">SUV</option>
            </select>
          </div>

          {/* Emergency Contact */}
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center mb-2">
              <Shield className="h-5 w-5 mr-2" />
              <label className="font-medium">Emergency Contact</label>
            </div>
            <input
              type="text"
              value={preferences.emergencyContact}
              onChange={(e) => handleEmergencyContactChange(e.target.value)}
              placeholder="Enter emergency contact number"
              className={`w-full p-2 rounded-md border ${
                darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings; 
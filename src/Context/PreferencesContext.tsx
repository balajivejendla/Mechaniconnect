import React, { createContext, useContext, useState, useEffect } from 'react';

interface Preferences {
  defaultLocation: string;
  preferredMechanics: string[];
  notifications: boolean;
  theme: 'light' | 'dark' | 'system';
  preferredServiceTime: string;
  vehicleType: string;
  emergencyContact: string;
}

interface PreferencesContextType {
  preferences: Preferences;
  updatePreferences: (newPreferences: Partial<Preferences>) => void;
}

const defaultPreferences: Preferences = {
  defaultLocation: '',
  preferredMechanics: [],
  notifications: true,
  theme: 'system',
  preferredServiceTime: 'morning',
  vehicleType: 'car',
  emergencyContact: ''
};

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<Preferences>(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    return savedPreferences ? JSON.parse(savedPreferences) : defaultPreferences;
  });

  const updatePreferences = (newPreferences: Partial<Preferences>) => {
    setPreferences(prev => {
      const updated = { ...prev, ...newPreferences };
      localStorage.setItem('userPreferences', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
}; 
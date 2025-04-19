import React, { useState, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './Context/ThemeContext';
import { PreferencesProvider } from './Context/PreferencesContext';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import ServiceCards from './components/ServiceCards.tsx';
import HowItWorks from './components/HowItWorks.tsx';
import Testimonials from './components/Testimonials.tsx';
import ContactUs from './pages/ContactUs.tsx';
import Footer from './components/Footer.tsx';
import ScrollToTop from './components/ScrollToTop.tsx';
import UserSettings from './components/UserSettings';
import LoadingSpinner from './components/LoadingSpinner';
import ContextHelp from './components/ContextHelp';
import SignIn from './pages/SignIn';
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [currentSection, setCurrentSection] = useState('booking');

  const scrollDown = () => {
    window.scrollTo({
      top: 1000,
      behavior: 'smooth'
    });
  };

  const handleNavigation = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleSectionChange = (section) => {
    setCurrentSection(section);
    setShowHelp(true);
  };

  return (
    <BrowserRouter>
      <ThemeProvider>
        <PreferencesProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Navbar 
              orderCount={orderCount} 
              onOrdersClick={() => setOrderCount(prev => prev + 1)}
              onNavigate={handleNavigation}
              onSectionChange={handleSectionChange}
            />
            
            {isLoading && <LoadingSpinner />}
            
            <Routes>
              <Route path="/" element={
                <>
                  <div className="pt-16">
                    <div className="relative w-full h-80 md:h-96 bg-gray-200 dark:bg-gray-800">
                      <img
                        src="/mechanic.jpg" 
                        alt="Mechanic connecting with people"
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center space-y-12">
                        <h2 className="text-white text-3xl md:text-5xl font-bold text-center">
                          Bridging the Gap Between Mechanics & People
                        </h2>
                        <button 
                          onClick={scrollDown}
                          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-300 transform hover:scale-105"
                        >
                          Get Started
                        </button>
                      </div>
                    </div>
                    
                    <main className="dark:bg-gray-900">
                      <Hero onSectionChange={handleSectionChange} />
                      <ServiceCards id="services" onSectionChange={handleSectionChange} />
                      <HowItWorks />
                      <Testimonials id="testimonials" onSectionChange={handleSectionChange} />
                    </main>
                  </div>
                </>
              } />
              <Route path="/contact" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <ContactUs />
                </Suspense>
              } />
              <Route path="/settings" element={
                <Suspense fallback={<LoadingSpinner />}>
                  <UserSettings />
                </Suspense>
              } />
              <Route path="/signin" element={<SignIn />} />
            </Routes>


            <Footer />
            <ScrollToTop />
            {showHelp && (
              <ContextHelp 
                currentSection={currentSection} 
                onClose={() => setShowHelp(false)} 
              />
            )}
          </div>
        </PreferencesProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
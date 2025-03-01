import React, { useState } from 'react';
import { Car, Wrench, Calendar, MapPin, Bell, User, Search, Menu, X, ChevronRight, Star, Clock, PenTool as Tool } from 'lucide-react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ServiceCards from './components/ServiceCards.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Testimonials from './components/Testimonials.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import { ThemeProvider } from './context/ThemeContext';
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <ThemeProvider>
    <div className="min-h-screen bg-gray-50">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />  
        <div className="relative w-full h-80 md:h-96 bg-gray-200">
      <img
        src="/mechanic.jpg" 
        alt="Mechanic connecting with people"
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center">
        <h2 className="text-white text-3xl md:text-5xl font-bold">
          Bridging the Gap Between Mechanics & People
        </h2>
      </div>
    </div>
      
      <main>

        <Hero />
        <ServiceCards />
        <HowItWorks />
        <Testimonials />
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
    </ThemeProvider>
  );
}

export default App;
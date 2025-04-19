import React from 'react';
import { Wrench, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white pt-12 pb-6 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Wrench className="h-6 w-6 text-blue-400 dark:text-blue-300" />
              <span className="text-xl font-bold text-white dark:text-gray-100">MechaniConnect</span>
            </div>
            <p className="text-gray-400 dark:text-gray-300 mb-4">
              Your trusted partner for vehicle maintenance and repair services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white dark:text-gray-300 dark:hover:text-white transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white dark:text-gray-300 dark:hover:text-white transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white dark:text-gray-300 dark:hover:text-white transition">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white dark:text-gray-100">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Services', 'How It Works', 'Find Mechanics', 'About Us'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-400 hover:text-white dark:text-gray-300 dark:hover:text-white transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white dark:text-gray-100">Services</h3>
            <ul className="space-y-2">
              {[
                'Regular Maintenance',
                'Diagnostics & Repair',
                'Oil & Fluids',
                'Battery Services',
                'AC Service & Repair'
              ].map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-400 hover:text-white dark:text-gray-300 dark:hover:text-white transition">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white dark:text-gray-100">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-gray-400 dark:text-gray-300 mt-0.5" />
                <span className="text-gray-400 dark:text-gray-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-gray-400 dark:text-gray-300 mt-0.5" />
                <span className="text-gray-400 dark:text-gray-300">support@mechaniconnect.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 dark:text-gray-300 mt-0.5" />
                <span className="text-gray-400 dark:text-gray-300">123 Repair Street, Auto City, AC 12345</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 dark:border-gray-600 pt-6 mt-6 text-center text-gray-400 dark:text-gray-300 text-sm">
          <p>&copy; {new Date().getFullYear()} MechaniConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
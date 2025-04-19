import React from 'react';
import { Star } from 'lucide-react';
import { useTheme } from '../Context/ThemeContext';

const Testimonials = () => {
  const { darkMode } = useTheme();

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Toyota Camry Owner',
      content: 'MechaniConnect made it so easy to find a reliable mechanic for my car. The service was prompt and professional, and I saved money compared to going to the dealership.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Honda Civic Owner',
      content: 'I love the maintenance tracking feature. It reminds me when my car needs service, and booking is just a few clicks away. The mechanics are all certified and trustworthy.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80',
    },
    {
      id: 3,
      name: 'Jessica Williams',
      role: 'Ford F-150 Owner',
      content: 'As someone who knows very little about cars, I appreciate how transparent MechaniConnect is. They explain what needs to be done and why, without any unnecessary upselling.',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&h=128&q=80',
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star 
        key={index} 
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400 fill-current' : darkMode ? 'text-gray-600' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section id="testimonials" className={`py-16 ${darkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-200`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
            What Our Customers Say
          </h2>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Trusted by thousands of vehicle owners across the country
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className={`${darkMode ? 'bg-gray-800 shadow-gray-800' : 'bg-gray-50 shadow-gray-200'} rounded-lg p-6 shadow-md transition-colors duration-200`}
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {testimonial.name}
                  </h4>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div className="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {testimonial.content}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="#reviews" 
            className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} font-medium transition`}
          >
            Read more customer reviews →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
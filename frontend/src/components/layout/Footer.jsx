import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-sm py-4 mt-8">
      <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
        <p>Powered by Open-Meteo API | &copy; {new Date().getFullYear()} Weather Activities Planner</p>
      </div>
    </footer>
  );
};

export default Footer;
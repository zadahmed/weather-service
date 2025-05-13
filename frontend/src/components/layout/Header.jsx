import React from 'react';
import { CloudSun } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center">
          <CloudSun size={32} className="text-indigo-600 mr-3" />
          <div>
            <h1 className="text-3xl font-bold text-indigo-600">Weather Activities Planner</h1>
            <p className="text-gray-600 mt-1">Find the best activities based on weather forecasts</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
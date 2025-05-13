import React from 'react';
import { Sun, CloudRain, CloudSnow } from 'lucide-react';

/**
 * Format date string to a more readable format
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

/**
 * Get weather icon based on weather code
 * @param {number} code - Weather code
 * @param {number} size - Icon size
 * @returns {JSX.Element} - Icon component
 */
export const getWeatherIcon = (code, size = 24) => {
  if (code === 0) return <Sun size={size} className="text-yellow-500" />;
  if (code >= 1 && code <= 3) return <Sun size={size} className="text-yellow-400" />;
  if (code >= 45 && code <= 48) return <div className="text-gray-400">🌫️</div>;
  if (code >= 51 && code <= 67) return <CloudRain size={size} className="text-blue-400" />;
  if (code >= 71 && code <= 86) return <CloudSnow size={size} className="text-blue-200" />;
  return <div className="text-gray-400">☁️</div>;
};

/**
 * Get color class based on score value
 * @param {number} score - Activity score
 * @returns {string} - CSS class for color
 */
export const getScoreColor = (score) => {
  if (score >= 80) return 'bg-green-100 text-green-800';
  if (score >= 50) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
};

/**
 * Format score for display (0-100 to 0-10)
 * @param {number} score - Raw score
 * @returns {string} - Formatted score with one decimal place
 */
export const formatScore = (score) => {
  return (score / 10).toFixed(1);
};

/**
 * Activity icon and label mapping
 */
export const ACTIVITY_META = {
  'skiing': { 
    label: 'Skiing', 
    icon: (props) => <CloudSnow className="text-blue-600" {...props} /> 
  },
  'surfing': { 
    label: 'Surfing', 
    icon: (props) => <CloudRain className="text-blue-600" {...props} />  
  },
  'outdoor_sightseeing': { 
    label: 'Outdoor Sightseeing', 
    icon: (props) => <Sun className="text-yellow-500" {...props} /> 
  },
  'indoor_sightseeing': { 
    label: 'Indoor Sightseeing', 
    icon: (props) => <Sun className="text-purple-600" {...props} /> 
  },
};
// src/hooks/useRecentSearches.js
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'weatherApp.recentSearches';
const MAX_RECENT_SEARCHES = 5;

/**
 * Custom hook to manage recent search history
 * @returns {Object} - Recent searches state and functions
 */
export const useRecentSearches = () => {
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading recent searches:', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentSearches));
    } catch (e) {
      console.error('Error saving recent searches:', e);
    }
  }, [recentSearches]);

  /**
   * Add a new search to history
   * @param {string} location - Location to add
   */
  const addToRecentSearches = (location) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item.toLowerCase() !== location.toLowerCase());
      return [location, ...filtered].slice(0, MAX_RECENT_SEARCHES);
    });
  };

  /**
   * Clear all recent searches
   */
  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  return {
    recentSearches,
    addToRecentSearches,
    clearRecentSearches
  };
};
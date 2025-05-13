import React, { createContext, useState, useContext, useCallback } from 'react';

const SearchContext = createContext({
  searchLocation: '',
  setSearchLocation: () => {},
  hasSearched: false,
  setHasSearched: () => {},
  recentSearches: [],
  addToRecentSearches: () => {},
  clearRecentSearches: () => {},
});

export const useSearchContext = () => useContext(SearchContext);

export const SearchContextProvider = ({ children }) => {
  const [searchLocation, setSearchLocation] = useState('');
  
  const [hasSearched, setHasSearched] = useState(false);
  
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });

  const addToRecentSearches = useCallback((location) => {
    if (!location) return;
    
    setRecentSearches(prev => {
      const updated = [location, ...prev.filter(item => item !== location)].slice(0, 5);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  }, []);

  const value = {
    searchLocation,
    setSearchLocation,
    hasSearched,
    setHasSearched,
    recentSearches,
    addToRecentSearches,
    clearRecentSearches,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};
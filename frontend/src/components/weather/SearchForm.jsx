import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, Clock, History, ArrowRightCircle, Trash2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

/**
 * Component for location search with improved recent searches display
 */
const SearchForm = ({ 
  onSearch, 
  loading, 
  error,
  recentSearches,
  clearRecentSearches,
  onSelectRecent
}) => {
  const [inputValue, setInputValue] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showRecentPanel, setShowRecentPanel] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onSearch(inputValue);
    setDropdownOpen(false);
    setShowRecentPanel(false);
  };

  const handleRecentSearchClick = (location) => {
    setInputValue(location);
    onSelectRecent(location);
    setDropdownOpen(false);
    setShowRecentPanel(false);
  };

  const handleShowRecent = () => {
    if (recentSearches.length === 0) return;
    setShowRecentPanel(!showRecentPanel);
  };


  return (
    <Card title="Search for a location" titleIcon={<MapPin className="text-indigo-600" />}>
      <div className="space-y-4">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-grow" ref={dropdownRef}>
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  if (e.target.value.trim() !== '' && recentSearches.length > 0) {
                    setDropdownOpen(true);
                  } else {
                    setDropdownOpen(false);
                  }
                }}
                onFocus={() => {
                  if (inputValue.trim() !== '' && recentSearches.length > 0) {
                    setDropdownOpen(true);
                  }
                }}
                placeholder="Enter city or town name..."
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={loading}
              />
              <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
              
              {inputValue && (
                <button
                  type="button"
                  onClick={() => {
                    setInputValue('');
                    setDropdownOpen(false);
                  }}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            
            {dropdownOpen && recentSearches.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                <div className="p-2 bg-gray-50 border-b flex justify-between items-center">
                  <span className="text-sm text-gray-600 font-medium">Recent Searches</span>
                </div>
                <ul className="max-h-60 overflow-auto">
                  {recentSearches
                    .filter(location => 
                      location.toLowerCase().includes(inputValue.toLowerCase())
                    )
                    .map((location, index) => (
                      <li key={index}>
                        <button
                          type="button"
                          onClick={() => handleRecentSearchClick(location)}
                          className="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between group"
                        >
                          <div className="flex items-center">
                            <Clock size={16} className="mr-2 text-gray-400" />
                            <span className="text-gray-700">{location}</span>
                          </div>
                          <ArrowRightCircle size={16} className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            {recentSearches.length > 0 && (
              <Button 
                type="button"
                variant="secondary"
                onClick={handleShowRecent}
                title="Show recent searches"
              >
                <History size={18} />
              </Button>
            )}
            
            <Button 
              type="submit"
              disabled={loading || !inputValue.trim()}
              isLoading={loading}
            >
              <Search size={18} className="mr-2" />
              <span>Search</span>
            </Button>
          </div>
        </form>
        
        {/* Recent Searches Panel */}
        {showRecentPanel && recentSearches.length > 0 && (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-3 animate-fade-in">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-700 flex items-center">
                <Clock size={16} className="mr-2 text-indigo-500" />
                Recent Searches
              </h3>
              <button
                type="button"
                onClick={clearRecentSearches}
                className="text-xs text-gray-500 hover:text-red-600 flex items-center"
              >
                <Trash2 size={14} className="mr-1" />
                Clear all
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((location, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleRecentSearchClick(location)}
                  className="inline-flex items-center px-3 py-1.5 bg-white rounded-full border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-sm"
                >
                  <MapPin size={14} className="mr-1 text-indigo-500" />
                  {location}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {error && !loading && (
          <div className="mt-2 p-3 bg-red-50 text-red-800 rounded-lg border-l-4 border-red-500">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">
                  Error: {error.message || 'Failed to fetch data. Please try again.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SearchForm;
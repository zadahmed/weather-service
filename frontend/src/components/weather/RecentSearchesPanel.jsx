import React from 'react';
import { MapPin, Clock, Trash2, X } from 'lucide-react';

/**
 * Component to display recent searches in a visually appealing way
 */
const RecentSearchesPanel = ({ 
  searches, 
  onSelectSearch, 
  onClearAll, 
  onRemoveSearch,
  className = ''
}) => {
  if (!searches || searches.length === 0) return null;

  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm ${className}`}>
      <div className="bg-indigo-50 px-4 py-2 border-b border-indigo-100 flex justify-between items-center">
        <h3 className="text-sm font-medium text-indigo-700 flex items-center">
          <Clock size={16} className="mr-2 text-indigo-500" />
          Recent Searches
        </h3>
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs text-gray-500 hover:text-red-600 flex items-center"
          aria-label="Clear all recent searches"
        >
          <Trash2 size={14} className="mr-1" />
          <span className="hidden sm:inline">Clear all</span>
        </button>
      </div>
      
      <div className="p-3">
        <div className="flex flex-wrap gap-2">
          {searches.map((location, index) => (
            <div 
              key={index}
              className="group relative inline-flex items-center px-3 py-1.5 bg-gray-50 hover:bg-indigo-50 rounded-full border border-gray-200 hover:border-indigo-300 text-sm transition-colors"
            >
              <button
                type="button"
                onClick={() => onSelectSearch(location)}
                className="flex items-center"
                aria-label={`Search for ${location}`}
              >
                <MapPin size={14} className="mr-1 text-indigo-500" />
                <span className="text-gray-700">{location}</span>
              </button>
              
              {onRemoveSearch && (
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveSearch(location);
                  }}
                  className="ml-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Remove ${location} from recent searches`}
                >
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentSearchesPanel;
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Sun } from 'lucide-react';
import { Card } from '../ui/Card';
import { 
  formatDate, 
  getScoreColor, 
  formatScore, 
  getWeatherIcon, 
  ACTIVITY_META 
} from '../../utils/weatherUtils';

/**
 * Component to display activity rankings
 */
const ActivityRankingCard = ({ location, activities }) => {
  const [expandedActivities, setExpandedActivities] = useState({});

  const toggleActivityExpanded = (activityId) => {
    setExpandedActivities(prev => ({
      ...prev,
      [activityId]: !prev[activityId]
    }));
  };

  return (
    <Card title={`Activity Rankings for ${location}`} titleIcon={<Sun className="text-indigo-600" />}>
      <div className="space-y-4">
        {activities.map(activity => {
          const activityKey = activity.activity;
          const meta = ACTIVITY_META[activityKey] || { 
            label: activityKey.charAt(0).toUpperCase() + activityKey.slice(1).replace(/_/g, ' '), 
            icon: (props) => <Sun className="text-gray-600" {...props} /> 
          };
          const isExpanded = expandedActivities[activityKey];
          
          return (
            <div key={activityKey} className="border rounded-lg overflow-hidden">
              <div 
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => toggleActivityExpanded(activityKey)}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-full bg-gray-100 flex items-center justify-center">
                    {meta.icon && meta.icon({ size: 20 })}
                  </div>
                  <span className="font-medium">{meta.label}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-1 rounded-full font-medium ${getScoreColor(activity.score)}`}>
                    {formatScore(activity.score)}/10
                  </div>
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </div>
              {isExpanded && (
                <div className="p-4 bg-gray-50 border-t">
                  <p className="mb-3 text-gray-700">Best day: {formatDate(activity.bestDay)}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activity.dailyRankings.slice(0, 4).map(day => (
                      <div key={day.date} className="bg-white p-3 rounded border">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{formatDate(day.date)}</span>
                          <span className={`px-2 py-0.5 rounded text-sm ${getScoreColor(day.score)}`}>
                            {formatScore(day.score)}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          {getWeatherIcon(day.weather.weatherCode, 16)}
                          <span className="ml-1">{day.weather.weatherDescription}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ActivityRankingCard;
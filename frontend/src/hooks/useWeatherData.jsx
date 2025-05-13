import { useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_ACTIVITY_RANKINGS } from '../graphql/queries';
import { useToast } from '../components/ui/Toaster';

/**
 * Custom hook to handle weather data fetching and processing
 * 
 * @param {Object} options - Hook options
 * @param {Function} options.setSearchLocation - Function to update search location
 * @param {Function} options.setHasSearched - Function to update search status
 * @param {Function} options.addToRecentSearches - Function to add to recent searches
 * @returns {Object} - Weather data and related functions
 */
export const useWeatherData = ({ 
  searchLocation, 
  setSearchLocation, 
  setHasSearched, 
  addToRecentSearches 
}) => {
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [activityData, setActivityData] = useState(null);
  const { showToast } = useToast();

  const processWeatherData = (data) => {
    if (!data?.activityRankings) return;
    
    setActivityData(data.activityRankings);
    
    if (data.activityRankings.length > 0) {
      const firstActivity = data.activityRankings[0];
      
      if (firstActivity.dailyRankings && Array.isArray(firstActivity.dailyRankings)) {
        const forecast = firstActivity.dailyRankings.map(day => ({
          date: day.date,
          temperature: day.weather.temperature,
          minTemperature: day.weather.temperature - 2, // Approximation
          maxTemperature: day.weather.temperature + 2, // Approximation
          precipitation: day.weather.precipitation,
          windSpeed: day.weather.windSpeed,
          snowfall: day.weather.snowfall || 0,
          weatherCode: day.weather.weatherCode,
          weatherDescription: day.weather.weatherDescription
        }));
        
        setWeatherForecast(forecast);
      }
    }
  };

  const [getWeatherData, { loading, error }] = useLazyQuery(GET_ACTIVITY_RANKINGS, {
    onCompleted: (data) => {
      if (data?.activityRankings) {
        showToast(`Activity rankings for ${searchLocation} loaded successfully!`, 'success');
        processWeatherData(data);
      }
    },
    onError: (error) => {
      console.error('Error fetching data:', error);
      showToast(`Error: ${error.message}`, 'error');
    }
  });

  const { loading: queryLoading } = useQuery(GET_ACTIVITY_RANKINGS, {
    variables: { location: searchLocation },
    skip: !searchLocation,
    onCompleted: processWeatherData
  });

  const searchWeatherData = async (location) => {
    if (!location.trim()) return;
    
    try {
      await getWeatherData({ variables: { location: location.trim() } });
      setSearchLocation(location.trim());
      setHasSearched(true);
      addToRecentSearches(location.trim());
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const showResults = weatherForecast && weatherForecast.length > 0 && 
                      activityData && activityData.length > 0;

  return {
    weatherForecast,
    activityData,
    loading: loading || queryLoading,
    error,
    searchWeatherData,
    showResults
  };
};
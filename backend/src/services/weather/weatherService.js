import axios from 'axios';
import createCache from '../../utils/cache/index.js';

/**
 * Service to fetch and process weather data from Open-Meteo
 */
class WeatherService {
  constructor() {
    this.cache = createCache(3600);
  }

  /**
   * Get weather forecast for a location
   * @param {string} location - City or town name
   * @returns {Promise<Object>} - Weather forecast for 7 days
   */
  async getWeatherForecast(location) {
    const cacheKey = `forecast_${location.toLowerCase()}`;
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }
    
    try {
      console.log(`Fetching forecast for location: ${location}`);
      
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`;
      const geoResponse = await axios.get(geoUrl);
      if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
        throw new Error(`Location not found: ${location}`);
      }
      
      const geoResult = geoResponse.data.results[0];
      const { latitude, longitude, name } = geoResult;
      
      const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=auto&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,windspeed_10m_max,snowfall_sum,cloudcover_mean,weathercode&forecast_days=7`;
      
      const forecastResponse = await axios.get(forecastUrl);
      
      const { daily } = forecastResponse.data;
      
      const forecast = {
        location: name,
        days: daily.time.map((time, i) => ({
          date: time,
          temperature: {
            min: daily.temperature_2m_min[i],
            max: daily.temperature_2m_max[i],
            avg: (daily.temperature_2m_min[i] + daily.temperature_2m_max[i]) / 2
          },
          precipitation: {
            sum: daily.precipitation_sum[i],
            probability: daily.precipitation_probability_max[i]
          },
          wind: {
            speed: daily.windspeed_10m_max[i]
          },
          snowfall: daily.snowfall_sum[i],
          cloudCover: daily.cloudcover_mean[i],
          weatherCode: daily.weathercode[i]
        }))
      };
      
      this.cache.set(cacheKey, forecast);
      
      return forecast;
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      
      if (error.response) {
        console.error('API Response Status:', error.response.status);
        console.error('API Response Data:', JSON.stringify(error.response.data, null, 2));
      }
      
      throw new Error(`Failed to retrieve weather forecast: ${error.message}`);
    }
  }

  /**
   * Clear the cache (useful for testing)
   */
  clearCache() {
    this.cache.flush();
  }
}

export default new WeatherService();
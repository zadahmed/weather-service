import weatherService from '../weather/index.js';
import { ACTIVITIES, WEATHER_CODES, WEATHER_DESCRIPTIONS } from '../../utils/constants.js';

/**
 * Service for ranking activities based on weather conditions
 */
class RankingService {
  /**
   * Score skiing conditions based on weather data
   * @param {Object} weatherDay - Weather data for a specific day
   * @returns {number} - Score from 0-100
   * @private
   */
  _scoreSkiing(weatherDay) {
    let score = 0;
    
    // Temperature: ideal when below freezing
    const tempScore = weatherDay.temperature.max < 0 ? 
      50 : Math.max(30 - weatherDay.temperature.max, 0);
    
    // Snowfall: more is better
    const snowScore = weatherDay.snowfall > 0 ? 
      Math.min(weatherDay.snowfall * 10, 50) : 0;
    
    // Wind: less is better
    const windScore = Math.max(50 - weatherDay.wind.speed / 20 * 50, 0);
    
    // Weather condition: snow is ideal
    let weatherScore = 0;
    if (WEATHER_CODES.SNOW.includes(weatherDay.weatherCode)) {
      weatherScore = 50; // Perfect!
    } else if (WEATHER_CODES.CLEAR.includes(weatherDay.weatherCode)) {
      weatherScore = 30; // Good
    } else if (WEATHER_CODES.RAIN.includes(weatherDay.weatherCode)) {
      weatherScore = 0;  // Terrible
    }
    
    score = tempScore * 0.3 + snowScore * 0.4 + windScore * 0.1 + weatherScore * 0.2;
    return Math.min(Math.max(score, 0), 100);
  }
  
  /**
   * Score surfing conditions based on weather data
   * @param {Object} weatherDay - Weather data for a specific day
   * @returns {number} - Score from 0-100
   * @private
   */
  _scoreSurfing(weatherDay) {
    let score = 0;
    
    // Temperature: 15-30°C is ideal
    const tempAvg = weatherDay.temperature.avg;
    let tempScore = 0;
    if (tempAvg >= 15 && tempAvg <= 30) {
      tempScore = 50 - Math.abs(tempAvg - 22.5) * 3;
    } else {
      tempScore = Math.max(0, 30 - Math.abs(tempAvg - 22.5));
    }
    
    // Wind: 10-30 km/h is ideal
    const windSpeed = weatherDay.wind.speed;
    let windScore = 0;
    if (windSpeed >= 10 && windSpeed <= 30) {
      windScore = 50 - Math.abs(windSpeed - 20) * 2.5;
    } else {
      windScore = Math.max(0, 30 - Math.abs(windSpeed - 20));
    }
    
    // Weather: clear is best
    let weatherScore = 0;
    if (WEATHER_CODES.CLEAR.includes(weatherDay.weatherCode)) {
      weatherScore = 50; // Perfect
    } else if (WEATHER_CODES.PARTLY_CLOUDY.includes(weatherDay.weatherCode)) {
      weatherScore = 40; // Very good
    } else if (WEATHER_CODES.OVERCAST.includes(weatherDay.weatherCode)) {
      weatherScore = 30; // Good
    } else if (WEATHER_CODES.DRIZZLE.includes(weatherDay.weatherCode)) {
      weatherScore = 20; // OK
    } else if (WEATHER_CODES.RAIN.includes(weatherDay.weatherCode)) {
      weatherScore = 10; // Bad
    } else {
      weatherScore = 0;  // Terrible
    }
    
    // Calculate final score with weights
    score = tempScore * 0.4 + windScore * 0.4 + weatherScore * 0.2;
    return Math.min(Math.max(score, 0), 100);
  }
  
  /**
   * Score outdoor sightseeing conditions
   * @param {Object} weatherDay - Weather data for a specific day
   * @returns {number} - Score from 0-100
   * @private
   */
  _scoreOutdoorSightseeing(weatherDay) {
    let score = 0;
    
    // Temperature: 15-25°C is ideal
    const tempAvg = weatherDay.temperature.avg;
    let tempScore = 0;
    if (tempAvg >= 15 && tempAvg <= 25) {
      tempScore = 50 - Math.abs(tempAvg - 20) * 5;
    } else {
      tempScore = Math.max(0, 30 - Math.abs(tempAvg - 20));
    }
    
    // Precipitation: less is better
    const precipScore = Math.max(50 - weatherDay.precipitation.probability, 0);
    
    // Cloud cover: less is better
    const cloudScore = Math.max(50 - weatherDay.cloudCover / 2, 0);
    
    // Weather: clear is best
    let weatherScore = 0;
    if (WEATHER_CODES.CLEAR.includes(weatherDay.weatherCode)) {
      weatherScore = 50; // Perfect
    } else if (WEATHER_CODES.PARTLY_CLOUDY.includes(weatherDay.weatherCode)) {
      weatherScore = 40; // Very good
    } else if (WEATHER_CODES.OVERCAST.includes(weatherDay.weatherCode)) {
      weatherScore = 20; // OK
    } else if (WEATHER_CODES.DRIZZLE.includes(weatherDay.weatherCode)) {
      weatherScore = 10; // Poor
    } else if (WEATHER_CODES.RAIN.includes(weatherDay.weatherCode)) {
      weatherScore = 0;  // Terrible
    }
    
    // Calculate final score with weights
    score = tempScore * 0.3 + precipScore * 0.3 + cloudScore * 0.1 + weatherScore * 0.3;
    return Math.min(Math.max(score, 0), 100);
  }
  
  /**
   * Score indoor sightseeing conditions
   * @param {Object} weatherDay - Weather data for a specific day
   * @returns {number} - Score from 0-100
   * @private
   */
  _scoreIndoorSightseeing(weatherDay) {
    let score = 0;
    
    // Temperature: extreme is better for indoor
    const tempAvg = weatherDay.temperature.avg;
    let tempScore = 0;
    if (tempAvg < 10 || tempAvg > 30) {
      tempScore = 50; // Extreme temps are good for indoor
    } else {
      tempScore = Math.max(0, 30 - Math.abs(20 - tempAvg));
    }
    
    // Precipitation: more is better for indoor
    const precipScore = Math.min(weatherDay.precipitation.probability, 50);
    
    // Weather: bad weather is good for indoor
    let weatherScore = 0;
    if (WEATHER_CODES.RAIN.includes(weatherDay.weatherCode) || 
        WEATHER_CODES.THUNDERSTORM.includes(weatherDay.weatherCode)) {
      weatherScore = 50; // Perfect for indoor
    } else if (WEATHER_CODES.DRIZZLE.includes(weatherDay.weatherCode) ||
               WEATHER_CODES.SNOW.includes(weatherDay.weatherCode)) {
      weatherScore = 40; // Very good for indoor
    } else if (WEATHER_CODES.OVERCAST.includes(weatherDay.weatherCode)) {
      weatherScore = 30; // Good for indoor
    } else if (WEATHER_CODES.PARTLY_CLOUDY.includes(weatherDay.weatherCode)) {
      weatherScore = 20; // OK for indoor
    } else if (WEATHER_CODES.CLEAR.includes(weatherDay.weatherCode)) {
      weatherScore = 10; // Better to be outside
    }
    
    // Calculate final score with weights
    score = tempScore * 0.3 + precipScore * 0.3 + weatherScore * 0.4;
    return Math.min(Math.max(score, 0), 100);
  }

  /**
   * Main method to rank activities for a location
   * @param {string} location - City or town name
   * @returns {Promise<Array>} - Ranked activities with scores
   */
  async rankActivities(location) {
    try {
      const forecast = await weatherService.getWeatherForecast(location);
      const activities = Object.values(ACTIVITIES);
    
      const scoringFunctions = {
        [ACTIVITIES.SKIING]: this._scoreSkiing.bind(this),
        [ACTIVITIES.SURFING]: this._scoreSurfing.bind(this),
        [ACTIVITIES.OUTDOOR_SIGHTSEEING]: this._scoreOutdoorSightseeing.bind(this),
        [ACTIVITIES.INDOOR_SIGHTSEEING]: this._scoreIndoorSightseeing.bind(this),
      };

      const activityRankings = activities.map(activity => {
        const scoringFunction = scoringFunctions[activity];
        
        const dailyScores = forecast.days.map(day => {
          const score = scoringFunction(day);
          return {
            date: day.date,
            score,
            weather: {
              temperature: day.temperature.avg,
              precipitation: day.precipitation.probability,
              windSpeed: day.wind.speed,
              cloudCover: day.cloudCover,
              snowfall: day.snowfall,
              weatherCode: day.weatherCode,
              weatherDescription: WEATHER_DESCRIPTIONS[day.weatherCode] || 'Unknown'
            }
          };
        });
        
        const sortedDays = [...dailyScores].sort((a, b) => b.score - a.score);
        
        const averageScore = dailyScores.reduce((sum, day) => sum + day.score, 0) / dailyScores.length;
        
        return {
          activity,
          score: averageScore,
          bestDay: sortedDays[0],
          dailyRankings: dailyScores
        };
      });
      
      return activityRankings
        .sort((a, b) => b.score - a.score)
        .map((activity, index) => ({
          ...activity,
          rank: index + 1
        }));
    } catch (error) {
      console.error('Error ranking activities:', error);
      throw new Error(`Failed to rank activities: ${error.message}`);
    }
  }
}

export default new RankingService();
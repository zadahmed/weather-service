import { WEATHER_DESCRIPTIONS } from '../../utils/constants.js';

const resolvers = {
  Query: {
    activityRankings: async (_, { location }, { dataSources }) => {
      try {
        const rankings = await dataSources.rankingService.rankActivities(location);
        
        return rankings.map(ranking => ({
          activity: ranking.activity,
          score: ranking.score,
          rank: ranking.rank,
          bestDay: ranking.bestDay.date,
          dailyRankings: ranking.dailyRankings.map(day => ({
            date: day.date,
            score: day.score,
            weather: {
              temperature: day.weather.temperature,
              precipitation: day.weather.precipitation,
              windSpeed: day.weather.windSpeed,
              cloudCover: day.weather.cloudCover,
              snowfall: day.weather.snowfall,
              weatherCode: day.weather.weatherCode,
              weatherDescription: WEATHER_DESCRIPTIONS[day.weather.weatherCode] || 'Unknown'
            }
          }))
        }));
      } catch (error) {
        console.error('Error in activityRankings resolver:', error);
        throw new Error(`Failed to get activity rankings: ${error.message}`);
      }
    }
  }
};

export default resolvers;
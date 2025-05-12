import gql from 'graphql-tag';

const typeDefs = gql`
  "Weather conditions for a specific day"
  type Weather {
    "Average temperature in Celsius"
    temperature: Float!
    
    "Precipitation probability as percentage (0-100)"
    precipitation: Float!
    
    "Wind speed in km/h"
    windSpeed: Float!
    
    "Cloud cover percentage (0-100)"
    cloudCover: Int!
    
    "Snowfall amount in cm (if any)"
    snowfall: Float
    
    "Weather code from Open-Meteo API"
    weatherCode: Int!
    
    "Human readable weather description"
    weatherDescription: String!
  }

  "Ranking for a specific activity on a specific day"
  type DayRanking {
    "Date in ISO format (YYYY-MM-DD)"
    date: String!
    
    "Score from 0-100 indicating how suitable the day is for the activity"
    score: Float!
    
    "Weather conditions for this day"
    weather: Weather!
  }

  "Overall ranking for an activity across the 7-day forecast"
  type ActivityRanking {
    "Name of the activity"
    activity: String!
    
    "Average score across the 7-day forecast (0-100)"
    score: Float!
    
    "Rank among all activities (1 = best)"
    rank: Int!
    
    "Date of the best day for this activity"
    bestDay: String!
    
    "Daily rankings for each day in the forecast"
    dailyRankings: [DayRanking!]!
  }

  type Query {
    "Get activity rankings for a specific location"
    activityRankings(location: String!): [ActivityRanking!]!
  }
`;

export default typeDefs;
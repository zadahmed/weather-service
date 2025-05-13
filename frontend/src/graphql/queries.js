// src/graphql/queries.js
import { gql } from '@apollo/client';

export const GET_ACTIVITY_RANKINGS = gql`
  query GetActivityRankings($location: String!) {
    activityRankings(location: $location) {
      activity
      score
      rank
      bestDay
      dailyRankings {
        date
        score
        weather {
          temperature
          precipitation
          windSpeed
          cloudCover
          snowfall
          weatherCode
          weatherDescription
        }
      }
    }
  }
`;
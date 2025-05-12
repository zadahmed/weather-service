// Activity types
export const ACTIVITIES = {
    SKIING: 'Skiing',
    SURFING: 'Surfing',
    OUTDOOR_SIGHTSEEING: 'Outdoor Sightseeing',
    INDOOR_SIGHTSEEING: 'Indoor Sightseeing'
  };
  
  // Weather code mappings for better decision making
  export const WEATHER_CODES = {
    CLEAR: [0, 1],                               // Clear sky, mainly clear
    PARTLY_CLOUDY: [2],                          // Partly cloudy
    OVERCAST: [3],                               // Overcast
    FOG: [45, 48],                               // Fog, depositing rime fog
    DRIZZLE: [51, 53, 55, 56, 57],               // Light to dense drizzle
    RAIN: [61, 63, 65, 66, 67, 80, 81, 82],      // Rain and rain showers
    SNOW: [71, 73, 75, 77, 85, 86],              // Snow and snow showers
    THUNDERSTORM: [95, 96, 99]                   // Thunderstorm
  };
  
  // Simple human-readable weather descriptions based on WMO codes
  export const WEATHER_DESCRIPTIONS = {
    0: "Clear sky",
    1: "Mostly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Foggy with frost",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Heavy drizzle",
    56: "Freezing drizzle",
    57: "Heavy freezing drizzle",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Freezing rain",
    67: "Heavy freezing rain",
    71: "Light snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Light rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Light snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Severe thunderstorm with hail"
  };
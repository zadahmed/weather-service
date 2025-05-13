import React, { useState } from "react";
import { MapPin, CloudRain } from "lucide-react";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./services/apolloClient";

import { useWeatherData } from "./hooks/useWeatherData";
import { useRecentSearches } from "./hooks/useRecentSearches";

import Layout from "./components/layout/Layout";
import { Card } from "./components/ui/Card";
import { Button } from "./components/ui/Button";
import SearchForm from "./components/weather/SearchForm";
import RecentSearchesPanel from "./components/weather/RecentSearchesPanel";
import ActivityRankingCard from "./components/weather/ActivityRankingCard";
import WeatherForecastCard from "./components/weather/WeatherForecastCard";

import { ToastProvider } from "./components/ui/Toaster";

/**
 * Weather Activities App Component
 */
const WeatherActivitiesApp = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const {
    recentSearches,
    addToRecentSearches,
    removeFromRecentSearches,
    clearRecentSearches,
    hasRecentSearches,
  } = useRecentSearches();

  const {
    weatherForecast,
    activityData,
    loading,
    error,
    searchWeatherData,
    showResults,
  } = useWeatherData({
    searchLocation,
    setSearchLocation,
    setHasSearched,
    addToRecentSearches,
  });
  const handleSearch = (location) => {
    searchWeatherData(location);
  };
  const handleRecentSearch = (location) => {
    searchWeatherData(location);
  };

  return (
    <div className="space-y-6">
      <SearchForm
        onSearch={handleSearch}
        loading={loading}
        error={error}
        recentSearches={recentSearches}
        clearRecentSearches={clearRecentSearches}
        onSelectRecent={handleRecentSearch}
      />

      {loading && (
        <div className="text-center p-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600 mb-2"></div>
          <p className="text-gray-600">Loading weather data...</p>
        </div>
      )}

      {showResults && (
        <>
          <Card>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="flex items-center mb-3 sm:mb-0">
                <MapPin size={24} className="text-indigo-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-800">
                  {searchLocation}
                </h2>
              </div>
              <div className="text-sm text-gray-500">
                {hasSearched
                  ? "Results based on your search"
                  : "Data loaded successfully"}
              </div>
            </div>
          </Card>

          {hasRecentSearches && (
            <RecentSearchesPanel
              searches={recentSearches}
              onSelectSearch={handleRecentSearch}
              onClearAll={clearRecentSearches}
              onRemoveSearch={removeFromRecentSearches}
              className="animate-fade-in"
            />
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivityRankingCard
              location={searchLocation}
              activities={activityData}
            />

            <WeatherForecastCard
              location={searchLocation}
              forecast={weatherForecast}
            />
          </div>
        </>
      )}

      {hasSearched && !showResults && !loading && (
        <Card>
          <div className="p-8 text-center">
            <CloudRain size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No Weather Data Available
            </h3>
            <p className="text-gray-500 mb-4">
              We couldn't retrieve the weather data for "{searchLocation}". This
              might be due to an incorrect location name or a temporary server
              issue.
            </p>

            {hasRecentSearches && (
              <div className="mt-6 mb-6">
                <h4 className="text-sm font-medium text-gray-600 mb-2">
                  Try one of your recent searches:
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {recentSearches.map((location, index) => (
                    <Button
                      key={index}
                      variant="secondary"
                      onClick={() => handleRecentSearch(location)}
                      className="flex items-center"
                    >
                      <MapPin size={14} className="mr-1" />
                      {location}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <Button
              variant="secondary"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

/**
 * Main App Component with Providers
 */
function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <ToastProvider>
        <Layout>
          <WeatherActivitiesApp />
        </Layout>
      </ToastProvider>
    </ApolloProvider>
  );
}

export default App;

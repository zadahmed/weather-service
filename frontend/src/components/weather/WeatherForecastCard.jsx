import React, { useState } from 'react';
import { Thermometer, CloudRain, CloudSnow, Wind } from 'lucide-react';
import { Card } from '../ui/Card';
import { formatDate, getWeatherIcon } from '../../utils/weatherUtils';

/**
 * Component to display daily weather forecast
 */
const WeatherForecastCard = ({ location, forecast }) => {
  const [selectedDay, setSelectedDay] = useState(0);
  
  if (!forecast || forecast.length === 0) return null;

  return (
    <Card title={`7-Day Weather Forecast for ${location}`}>
      <div className="flex overflow-x-auto pb-2 mb-4 gap-2">
        {forecast.map((day, index) => (
          <button
            key={day.date}
            onClick={() => setSelectedDay(index)}
            className={`flex-shrink-0 px-3 py-2 rounded-md text-sm ${
              selectedDay === index
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            {formatDate(day.date)}
          </button>
        ))}
      </div>
      
      {forecast[selectedDay] && (
        <div className="border rounded-lg p-4">
          <div className="text-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">
              {formatDate(forecast[selectedDay].date)}
            </h3>
            <p className="text-gray-600">{forecast[selectedDay].weatherDescription}</p>
          </div>
          
          <div className="flex justify-center mb-6">
            {getWeatherIcon(forecast[selectedDay].weatherCode, 48)}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <WeatherMetricItem 
              icon={<Thermometer size={20} className="text-red-500" />}
              label="Temperature"
              value={`${forecast[selectedDay].temperature.toFixed(1)}°C`}
            />
            
            <WeatherMetricItem
              icon={<Thermometer size={20} className="text-blue-500" />}
              label="Min/Max"
              value={`${forecast[selectedDay].minTemperature.toFixed(1)}° / ${forecast[selectedDay].maxTemperature.toFixed(1)}°C`}
            />
            
            <WeatherMetricItem
              icon={<CloudRain size={20} className="text-blue-500" />}
              label="Precipitation"
              value={`${forecast[selectedDay].precipitation}%`}
            />
            
            <WeatherMetricItem
              icon={<Wind size={20} className="text-gray-500" />}
              label="Wind Speed"
              value={`${forecast[selectedDay].windSpeed} km/h`}
            />
            
            {forecast[selectedDay].snowfall > 0 && (
              <div className="col-span-2">
                <WeatherMetricItem
                  icon={<CloudSnow size={20} className="text-blue-200" />}
                  label="Snowfall"
                  value={`${forecast[selectedDay].snowfall} cm`}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};

/**
 * Weather metric display component
 */
const WeatherMetricItem = ({ icon, label, value }) => (
  <div className="bg-blue-50 p-3 rounded-lg flex items-center">
    <div className="mr-2">{icon}</div>
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  </div>
);

export default WeatherForecastCard;
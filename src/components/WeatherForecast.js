import React from 'react';
import './WeatherForecast.css';

/**
 * WeatherForecast component to display 5-day weather forecast
 * @param {Object} props - Component props
 * @param {Array} props.forecastData - 5-day forecast data from API
 * @param {string} props.unit - Temperature unit ('metric' or 'imperial')
 */
const WeatherForecast = ({ forecastData, unit }) => {
  if (!forecastData || forecastData.length === 0) {
    return (
      <div className="forecast-container">
        <div className="forecast-placeholder">
          <p>No forecast data available</p>
        </div>
      </div>
    );
  }

  // Get weather icon based on condition
  const getWeatherIcon = (condition) => {
    const iconMap = {
      '01d': '☀️', // clear sky day
      '01n': '🌙', // clear sky night
      '02d': '⛅', // few clouds day
      '02n': '☁️', // few clouds night
      '03d': '☁️', // scattered clouds
      '03n': '☁️', // scattered clouds
      '04d': '☁️', // broken clouds
      '04n': '☁️', // broken clouds
      '09d': '🌧️', // shower rain
      '09n': '🌧️', // shower rain
      '10d': '🌦️', // rain day
      '10n': '🌧️', // rain night
      '11d': '⛈️', // thunderstorm
      '11n': '⛈️', // thunderstorm
      '13d': '❄️', // snow
      '13n': '❄️', // snow
      '50d': '🌫️', // mist
      '50n': '🌫️', // mist
    };
    return iconMap[condition] || '🌤️';
  };

  // Format temperature with unit
  const formatTemperature = (temp) => {
    const unitSymbol = unit === 'metric' ? '°C' : '°F';
    return `${Math.round(temp)}${unitSymbol}`;
  };

  // Format wind speed with unit
  const formatWindSpeed = (speed) => {
    const speedUnit = unit === 'metric' ? 'm/s' : 'mph';
    return `${speed.toFixed(1)} ${speedUnit}`;
  };

  // Format date for forecast items
  const formatForecastDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Check if it's today
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }
    // Check if it's tomorrow
    if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    }
    // Otherwise return day name
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Format time for forecast items
  const formatForecastTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  // Get weather description with proper capitalization
  const getWeatherDescription = (description) => {
    return description.charAt(0).toUpperCase() + description.slice(1);
  };

  // Group forecast data by day (simplified for 5-day display)
  const groupForecastByDay = () => {
    const grouped = {};
    forecastData.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toDateString();
      
      if (!grouped[dayKey]) {
        grouped[dayKey] = [];
      }
      grouped[dayKey].push(item);
    });

    // Convert to array and take first 5 days
    return Object.values(grouped).slice(0, 5);
  };

  const dailyForecasts = groupForecastByDay();

  return (
    <div className="weather-forecast">
      <div className="forecast-header">
        <h3 className="forecast-title">5-Day Forecast</h3>
        <p className="forecast-subtitle">Extended weather outlook</p>
      </div>

      <div className="forecast-grid">
        {dailyForecasts.map((dayForecasts, dayIndex) => {
          // Get representative data for the day (midday forecast or first available)
          const representativeForecast = dayForecasts[Math.floor(dayForecasts.length / 2)] || dayForecasts[0];
          const {
            main: { temp, temp_min, temp_max, humidity },
            weather: [weatherInfo],
            wind: { speed: windSpeed },
            dt: timestamp
          } = representativeForecast;

          return (
            <div key={dayIndex} className="forecast-item">
              <div className="forecast-date">
                <div className="forecast-day">
                  {formatForecastDate(timestamp)}
                </div>
                <div className="forecast-time">
                  {formatForecastTime(timestamp)}
                </div>
              </div>

              <div className="forecast-weather">
                <div className="forecast-icon">
                  {getWeatherIcon(weatherInfo.icon)}
                </div>
                <div className="forecast-description">
                  {getWeatherDescription(weatherInfo.description)}
                </div>
              </div>

              <div className="forecast-temperatures">
                <div className="forecast-temp-main">
                  {formatTemperature(temp)}
                </div>
                <div className="forecast-temp-range">
                  <span className="temp-high">
                    {formatTemperature(temp_max)}
                  </span>
                  <span className="temp-separator">/</span>
                  <span className="temp-low">
                    {formatTemperature(temp_min)}
                  </span>
                </div>
              </div>

              <div className="forecast-details">
                <div className="forecast-detail">
                  <span className="detail-icon">💧</span>
                  <span className="detail-value">{humidity}%</span>
                </div>
                <div className="forecast-detail">
                  <span className="detail-icon">💨</span>
                  <span className="detail-value">{formatWindSpeed(windSpeed)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="forecast-footer">
        <p className="forecast-note">
          Forecast data provided by OpenWeatherMap
        </p>
      </div>
    </div>
  );
};

export default WeatherForecast;

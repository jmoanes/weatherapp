import React from 'react';
import './WeatherCard.css';

/**
 * WeatherCard component to display weather information
 * @param {Object} props - Component props
 * @param {Object} props.weatherData - Weather data from API
 * @param {string} props.unit - Temperature unit ('metric' or 'imperial')
 */
const WeatherCard = ({ weatherData, unit }) => {
  if (!weatherData) return null;

  // Extract weather information from API response
  const {
    name: cityName,
    main: { temp, feels_like, humidity, pressure, temp_min, temp_max, sea_level, grnd_level },
    weather: [weatherInfo],
    wind: { speed: windSpeed, deg: windDirection },
    sys: { country, sunrise, sunset },
    dt: timestamp,
    visibility,
    clouds: { all: cloudiness }
  } = weatherData;

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

  // Format pressure
  const formatPressure = (pressure) => {
    return `${pressure} hPa`;
  };

  // Format visibility
  const formatVisibility = (visibility) => {
    if (unit === 'metric') {
      return `${(visibility / 1000).toFixed(1)} km`;
    } else {
      return `${(visibility * 0.000621371).toFixed(1)} mi`;
    }
  };

  // Format wind direction
  const formatWindDirection = (degrees) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  // Format sunrise/sunset time
  const formatSunTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  // Format date and time for the location
  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    };
    return date.toLocaleDateString('en-US', options);
  };

  // Get weather description with proper capitalization
  const getWeatherDescription = (description) => {
    return description.charAt(0).toUpperCase() + description.slice(1);
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="location-info">
          <h2 className="city-name">
            {cityName}, {country}
          </h2>
          <p className="date-time">
            {formatDateTime(timestamp)}
          </p>
        </div>
        <div className="weather-icon">
          {getWeatherIcon(weatherInfo.icon)}
        </div>
      </div>

      <div className="weather-main">
        <div className="temperature-section">
          <div className="current-temp">
            {formatTemperature(temp)}
          </div>
          <div className="weather-description">
            {getWeatherDescription(weatherInfo.description)}
          </div>
          <div className="feels-like">
            Feels like {formatTemperature(feels_like)}
          </div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <div className="detail-icon">💧</div>
          <div className="detail-info">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{humidity}%</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">💨</div>
          <div className="detail-info">
            <span className="detail-label">Wind</span>
            <span className="detail-value">{formatWindSpeed(windSpeed)} {formatWindDirection(windDirection)}</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">📊</div>
          <div className="detail-info">
            <span className="detail-label">Pressure</span>
            <span className="detail-value">{formatPressure(pressure)}</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">👁️</div>
          <div className="detail-info">
            <span className="detail-label">Visibility</span>
            <span className="detail-value">{formatVisibility(visibility)}</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">☁️</div>
          <div className="detail-info">
            <span className="detail-label">Cloudiness</span>
            <span className="detail-value">{cloudiness}%</span>
          </div>
        </div>

        <div className="detail-item">
          <div className="detail-icon">🌡️</div>
          <div className="detail-info">
            <span className="detail-label">Temp Range</span>
            <span className="detail-value">{formatTemperature(temp_max)} / {formatTemperature(temp_min)}</span>
          </div>
        </div>
      </div>

      {/* Sunrise/Sunset Information */}
      <div className="sun-info">
        <div className="sun-item">
          <div className="sun-icon">🌅</div>
          <div className="sun-details">
            <span className="sun-label">Sunrise</span>
            <span className="sun-time">{formatSunTime(sunrise)}</span>
          </div>
        </div>
        <div className="sun-item">
          <div className="sun-icon">🌇</div>
          <div className="sun-details">
            <span className="sun-label">Sunset</span>
            <span className="sun-time">{formatSunTime(sunset)}</span>
          </div>
        </div>
      </div>

      <div className="weather-footer">
        <p className="weather-source">
          Weather data provided by OpenWeatherMap
        </p>
      </div>
    </div>
  );
};

export default WeatherCard;

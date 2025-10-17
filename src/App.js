import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeatherForecast from './components/WeatherForecast';
import WeatherChart from './components/WeatherChart';

// API configuration - Replace with your actual API key
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast";

function App() {
  // State management for weather data and UI
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit
  const [chartType, setChartType] = useState('temperature'); // 'temperature', 'humidity', or 'wind'

  /**
   * Fetch current weather data from OpenWeatherMap API
   * @param {string} cityName - Name of the city to get weather for
   */
  const fetchCurrentWeather = async (cityName) => {
    const response = await fetch(
      `${API_BASE_URL}?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=${unit}`
    );

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found. Please check the spelling and try again.');
      } else if (response.status === 401) {
        throw new Error('Invalid API key. Please check your configuration.');
      } else {
        throw new Error('Failed to fetch weather data. Please try again.');
      }
    }

    return await response.json();
  };

  /**
   * Fetch 5-day forecast data from OpenWeatherMap API
   * @param {string} cityName - Name of the city to get forecast for
   */
  const fetchForecastData = async (cityName) => {
    const response = await fetch(
      `${FORECAST_API_URL}?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=${unit}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch forecast data. Please try again.');
    }

    const data = await response.json();
    // Return first 40 items (5 days * 8 forecasts per day = 40 total)
    return data.list.slice(0, 40);
  };

  /**
   * Fetch both current weather and forecast data
   * @param {string} cityName - Name of the city to get weather for
   */
  const fetchWeatherData = async (cityName) => {
    if (!cityName.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch both current weather and forecast data in parallel
      const [currentWeather, forecast] = await Promise.all([
        fetchCurrentWeather(cityName),
        fetchForecastData(cityName)
      ]);

      setWeatherData(currentWeather);
      setForecastData(forecast);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle city search from SearchBar component
   * @param {string} searchCity - City name entered by user
   */
  const handleSearch = (searchCity) => {
    setCity(searchCity);
    fetchWeatherData(searchCity);
  };

  /**
   * Toggle between Celsius and Fahrenheit
   */
  const toggleUnit = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
    
    // Refetch data with new unit if we have a city
    if (city) {
      fetchWeatherData(city);
    }
  };

  // Load default city on component mount (optional)
  useEffect(() => {
    // Uncomment the line below to load a default city on app start
    // fetchWeatherData('London');
  }, []);

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">Weather App</h1>
          <p className="app-subtitle">Get current weather information for any city</p>
        </header>

        <SearchBar 
          onSearch={handleSearch} 
          loading={loading}
        />

        <div className="unit-toggle">
          <button 
            className={`unit-btn ${unit === 'metric' ? 'active' : ''}`}
            onClick={() => setUnit('metric')}
          >
            °C
          </button>
          <button 
            className={`unit-btn ${unit === 'imperial' ? 'active' : ''}`}
            onClick={() => setUnit('imperial')}
          >
            °F
          </button>
        </div>

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              <p>{error}</p>
            </div>
          </div>
        )}

        {weatherData && !loading && !error && (
          <>
            <WeatherCard 
              weatherData={weatherData} 
              unit={unit}
            />
            
            {/* Chart Type Selector */}
            <div className="chart-type-selector">
              <button 
                className={`chart-type-btn ${chartType === 'temperature' ? 'active' : ''}`}
                onClick={() => setChartType('temperature')}
              >
                Temperature
              </button>
              <button 
                className={`chart-type-btn ${chartType === 'humidity' ? 'active' : ''}`}
                onClick={() => setChartType('humidity')}
              >
                Humidity
              </button>
              <button 
                className={`chart-type-btn ${chartType === 'wind' ? 'active' : ''}`}
                onClick={() => setChartType('wind')}
              >
                Wind Speed
              </button>
            </div>

            {/* Weather Chart */}
            {forecastData && (
              <WeatherChart 
                forecastData={forecastData} 
                unit={unit}
                chartType={chartType}
              />
            )}

            {/* Weather Forecast */}
            {forecastData && (
              <WeatherForecast 
                forecastData={forecastData} 
                unit={unit}
              />
            )}
          </>
        )}

        <footer className="app-footer">
          <p>Powered by OpenWeatherMap API</p>
        </footer>
      </div>
    </div>
  );
}

export default App;

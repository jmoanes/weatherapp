# Professional Weather App

A comprehensive, professional-grade weather application built with React and Chart.js. Get detailed current weather information, 5-day forecasts, and interactive data visualizations for any city worldwide.

## ✨ Features

### 🌤️ **Current Weather Display**
- Real-time temperature, humidity, wind speed, and pressure
- Detailed weather metrics including visibility, cloudiness, and temperature range
- Wind direction with compass bearings
- Sunrise and sunset times with animated icons
- Professional weather condition descriptions

### 📊 **Interactive Data Visualization**
- **Temperature Charts** - Line graphs showing temperature trends over 5 days
- **Humidity Charts** - Bar charts displaying humidity levels
- **Wind Speed Charts** - Line graphs tracking wind patterns
- Professional Chart.js integration with smooth animations
- Responsive chart design for all screen sizes

### 🔮 **5-Day Weather Forecast**
- Comprehensive 5-day weather outlook
- Hourly forecast data with temperature ranges
- Weather condition icons and descriptions
- Humidity and wind speed for each forecast period
- Professional card-based layout

### 🔍 **Advanced Search & Navigation**
- City search with autocomplete suggestions
- Quick search buttons for popular cities
- Real-time search validation and error handling
- Professional loading states and animations

### 🌡️ **Unit Conversion & Customization**
- Toggle between Celsius and Fahrenheit
- Automatic unit conversion for all measurements
- Consistent unit display across all components

### 📱 **Professional Responsive Design**
- Mobile-first responsive design
- Professional color scheme and typography
- Smooth animations and transitions
- Modern glassmorphism effects
- Cross-browser compatibility

### ⚡ **Performance & Reliability**
- Parallel API calls for optimal performance
- Error handling with user-friendly messages
- Loading states for better user experience
- Professional data validation

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Get API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key from the dashboard

### 3. Configure API Key

Open `src/App.js` and replace the placeholder:

```javascript
const API_KEY = "YOUR_API_KEY_HERE";
```

With your actual API key:

```javascript
const API_KEY = "your_actual_api_key_here";
```

### 4. Start the Application

```bash
npm start
```

The app will open in your browser at `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── SearchBar.js          # City search input component
│   ├── SearchBar.css         # Search bar styling
│   ├── WeatherCard.js        # Current weather display component
│   ├── WeatherCard.css       # Weather card styling
│   ├── WeatherForecast.js    # 5-day forecast component
│   ├── WeatherForecast.css   # Forecast styling
│   ├── WeatherChart.js       # Interactive charts component
│   └── WeatherChart.css      # Chart styling
├── App.js                    # Main application component
├── App.css                   # Main application styling
├── index.js                  # Application entry point
└── index.css                 # Global styles
```

## Components

### App Component
- Main wrapper component managing global state
- Handles parallel API calls for current weather and forecast data
- Manages unit conversion and chart type selection
- Coordinates between all child components
- Professional error handling and loading states

### SearchBar Component
- Advanced city input field with search functionality
- Quick search suggestions for popular cities
- Professional loading states and animations
- Form validation with user-friendly error messages
- Responsive design for all screen sizes

### WeatherCard Component
- Comprehensive current weather display
- Detailed metrics: temperature, humidity, wind (speed & direction), pressure
- Additional data: visibility, cloudiness, temperature range
- Sunrise and sunset times with animated icons
- Professional card layout with glassmorphism effects

### WeatherForecast Component
- 5-day weather forecast display
- Hourly forecast data with temperature ranges
- Weather condition icons and descriptions
- Humidity and wind speed for each period
- Responsive grid layout for optimal viewing

### WeatherChart Component
- Interactive data visualization using Chart.js
- Multiple chart types: temperature, humidity, wind speed
- Professional line and bar charts with animations
- Responsive design with smooth transitions
- Chart type selector for user customization

## API Integration

The app uses the OpenWeatherMap API with two endpoints for comprehensive weather data:

### Current Weather API
- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Parameters**: City name, API key, units (metric/imperial)
- **Response**: Current weather data including temperature, humidity, wind, pressure, visibility, etc.

### 5-Day Forecast API
- **Endpoint**: `https://api.openweathermap.org/data/2.5/forecast`
- **Parameters**: City name, API key, units (metric/imperial)
- **Response**: 5-day forecast with 3-hour intervals (40 data points)
- **Usage**: Powers both the forecast component and interactive charts

### Performance Optimization
- Parallel API calls for current weather and forecast data
- Efficient data processing and caching
- Professional error handling for network issues

## Styling & Design

### Professional Design System
- **Modern CSS** - Custom styling with no external frameworks
- **Responsive Design** - Mobile-first approach with breakpoints
- **Professional Animations** - Smooth transitions, fade-ins, and hover effects
- **Glassmorphism Effects** - Modern backdrop blur and transparency
- **Gradient Backgrounds** - Professional color schemes and gradients

### Visual Elements
- **Interactive Charts** - Chart.js integration with professional styling
- **Card Layout** - Clean, organized information display
- **Icon System** - Emoji-based weather icons with animations
- **Typography** - Professional font hierarchy and spacing
- **Color Palette** - Consistent brand colors throughout the app

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

### Core Dependencies
- **React** (^18.2.0) - Modern React with hooks
- **React DOM** (^18.2.0) - React rendering
- **React Scripts** (5.0.1) - Build tools and development server

### Chart & Visualization
- **Chart.js** (^4.4.0) - Professional charting library
- **React Chart.js 2** (^5.2.0) - React wrapper for Chart.js

## Future Enhancements

- **Weather Alerts** - Real-time weather warnings and notifications
- **Location Services** - GPS-based automatic location detection
- **Weather History** - Historical weather data and trends
- **Multiple Cities** - Save and compare multiple city favorites
- **Dark/Light Theme** - User preference theme toggle
- **Weather Maps** - Interactive weather map integration
- **Export Features** - Export weather data and charts
- **Offline Support** - Service worker for offline functionality

## License

This project is open source and available under the [MIT License](LICENSE).

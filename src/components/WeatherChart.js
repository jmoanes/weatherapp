import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import './WeatherChart.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

/**
 * WeatherChart component for displaying weather data in professional charts
 * @param {Object} props - Component props
 * @param {Array} props.forecastData - 5-day forecast data from API
 * @param {string} props.unit - Temperature unit ('metric' or 'imperial')
 * @param {string} props.chartType - Type of chart to display ('temperature' or 'humidity')
 */
const WeatherChart = ({ forecastData, unit, chartType = 'temperature' }) => {
  if (!forecastData || forecastData.length === 0) {
    return (
      <div className="chart-container">
        <div className="chart-placeholder">
          <p>No forecast data available for chart display</p>
        </div>
      </div>
    );
  }

  // Process forecast data for chart display
  const processChartData = () => {
    const labels = [];
    const temperatureData = [];
    const humidityData = [];
    const windSpeedData = [];

    forecastData.forEach((item, index) => {
      // Format date for labels (show day and time)
      const date = new Date(item.dt * 1000);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const time = date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
      
      labels.push(`${dayName}\n${time}`);
      
      // Extract weather data
      temperatureData.push(Math.round(item.main.temp));
      humidityData.push(item.main.humidity);
      windSpeedData.push(item.wind.speed);
    });

    return { labels, temperatureData, humidityData, windSpeedData };
  };

  const { labels, temperatureData, humidityData, windSpeedData } = processChartData();

  // Chart configuration options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#667eea',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        intersect: false,
        mode: 'index'
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          },
          color: '#7f8c8d'
        }
      },
      y: {
        grid: {
          color: 'rgba(102, 126, 234, 0.1)',
          drawBorder: false
        },
        ticks: {
          font: {
            size: 11
          },
          color: '#7f8c8d'
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  // Temperature chart data
  const temperatureChartData = {
    labels,
    datasets: [
      {
        label: `Temperature (${unit === 'metric' ? '°C' : '°F'})`,
        data: temperatureData,
        borderColor: '#667eea',
        backgroundColor: 'rgba(102, 126, 234, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#667eea',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#667eea',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 3
      }
    ]
  };

  // Humidity chart data
  const humidityChartData = {
    labels,
    datasets: [
      {
        label: 'Humidity (%)',
        data: humidityData,
        backgroundColor: [
          'rgba(102, 126, 234, 0.8)',
          'rgba(118, 75, 162, 0.8)',
          'rgba(102, 126, 234, 0.8)',
          'rgba(118, 75, 162, 0.8)',
          'rgba(102, 126, 234, 0.8)'
        ],
        borderColor: [
          '#667eea',
          '#764ba2',
          '#667eea',
          '#764ba2',
          '#667eea'
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false
      }
    ]
  };

  // Wind speed chart data
  const windChartData = {
    labels,
    datasets: [
      {
        label: `Wind Speed (${unit === 'metric' ? 'm/s' : 'mph'})`,
        data: windSpeedData,
        borderColor: '#764ba2',
        backgroundColor: 'rgba(118, 75, 162, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#764ba2',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#764ba2',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 3
      }
    ]
  };

  // Render appropriate chart based on type
  const renderChart = () => {
    switch (chartType) {
      case 'temperature':
        return <Line data={temperatureChartData} options={chartOptions} />;
      case 'humidity':
        return <Bar data={humidityChartData} options={chartOptions} />;
      case 'wind':
        return <Line data={windChartData} options={chartOptions} />;
      default:
        return <Line data={temperatureChartData} options={chartOptions} />;
    }
  };

  // Get chart title based on type
  const getChartTitle = () => {
    switch (chartType) {
      case 'temperature':
        return `Temperature Forecast (${unit === 'metric' ? '°C' : '°F'})`;
      case 'humidity':
        return 'Humidity Forecast (%)';
      case 'wind':
        return `Wind Speed Forecast (${unit === 'metric' ? 'm/s' : 'mph'})`;
      default:
        return 'Weather Forecast';
    }
  };

  return (
    <div className="weather-chart">
      <div className="chart-header">
        <h3 className="chart-title">{getChartTitle()}</h3>
        <div className="chart-subtitle">5-Day Forecast Data</div>
      </div>
      
      <div className="chart-wrapper">
        {renderChart()}
      </div>
      
      <div className="chart-footer">
        <p className="chart-note">
          Data provided by OpenWeatherMap API
        </p>
      </div>
    </div>
  );
};

export default WeatherChart;

import React, { useState } from 'react';
import './SearchBar.css';

/**
 * SearchBar component for city input and search functionality
 * @param {Object} props - Component props
 * @param {Function} props.onSearch - Callback function when search is triggered
 * @param {boolean} props.loading - Loading state to disable input during API calls
 */
const SearchBar = ({ onSearch, loading }) => {
  const [inputValue, setInputValue] = useState('');

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !loading) {
      onSearch(inputValue.trim());
    }
  };

  /**
   * Handle input change
   * @param {Event} e - Input change event
   */
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  /**
   * Handle search button click
   */
  const handleSearchClick = () => {
    if (inputValue.trim() && !loading) {
      onSearch(inputValue.trim());
    }
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-group">
          <input
            type="text"
            className="search-input"
            placeholder="Enter city name (e.g., London, New York, Tokyo)"
            value={inputValue}
            onChange={handleInputChange}
            disabled={loading}
            autoComplete="off"
            spellCheck="false"
          />
          <button
            type="submit"
            className="search-button"
            disabled={loading || !inputValue.trim()}
            onClick={handleSearchClick}
          >
            {loading ? (
              <div className="button-spinner"></div>
            ) : (
              <span className="search-icon">🔍</span>
            )}
          </button>
        </div>
      </form>
      
      {/* Quick search suggestions */}
      <div className="search-suggestions">
        <p className="suggestions-label">Quick search:</p>
        <div className="suggestion-buttons">
          {['London', 'New York', 'Tokyo', 'Paris', 'Sydney'].map((city) => (
            <button
              key={city}
              className="suggestion-btn"
              onClick={() => {
                setInputValue(city);
                onSearch(city);
              }}
              disabled={loading}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;

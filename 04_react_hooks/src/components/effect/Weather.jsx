import React, { useState, useEffect } from 'react';

const Weather = () => {
  const API_KEY = '6738f12b7edab9979503bef64d17135f';
  const [cityInput, setCityInput] = useState('');
  const [searchTrigger, setSearchTrigger] = useState(null); // 初始值为null
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const fetchWeather = async () => {
      if (!searchTrigger) return; // 初始不执行

      try {
        setLoading(true);
        setError('');
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityInput)}&appid=${API_KEY}&units=metric`,
          { signal: controller.signal }
        );

        if (!response.ok) throw new Error('City not found');

        const data = await response.json();
        setWeatherData({
          city: data.name,
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          wind_speed: data.wind.speed,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          visibility: data.visibility
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to fetch weather data');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    return () => controller.abort();
  }, [searchTrigger]); // 只监听searchTrigger变化

  const handleSearch = () => {
    if (cityInput.trim()) {
      setSearchTrigger(Date.now()); // 使用时间戳作为唯一触发标识
    }
  };
  // 新增时间格式化函数
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };
  return (
    <div style={containerStyle}>
      <h1>Weather Finder</h1>
      <div style={searchBoxStyle}>
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Enter city name"
          style={inputStyle}
        />
        <button
          onClick={handleSearch}
          style={buttonStyle}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p style={errorStyle}>⚠️ {error}</p>}

      {/* 只在有数据且没有错误时显示 */}
      {weatherData && !error && !loading && (
        <div style={weatherCardStyle}>
          <div style={headerStyle}>
            <h2 style={cityStyle}>{weatherData.city}</h2>
            <div style={tempWrapperStyle}>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.icon}@4x.png`}
                alt="Weather icon"
                style={iconStyle}
              />
              <div>
                <p style={tempStyle}>{Math.round(weatherData.temp)}°C</p>
                <p style={feelsLikeStyle}>体感 {Math.round(weatherData.feels_like)}°C</p>
              </div>
            </div>
            <p style={descriptionStyle}>{weatherData.description}</p>
          </div>

          <div style={gridContainer}>
            {/* 天气指标卡片 */}
            <div style={metricCard}>
              <i className="wi wi-barometer" style={metricIcon}></i>
              <div>
                <p style={metricValue}>{weatherData.pressure} hPa</p>
                <p style={metricLabel}>气压</p>
              </div>
            </div>

            <div style={metricCard}>
              <i className="wi wi-humidity" style={metricIcon}></i>
              <div>
                <p style={metricValue}>{weatherData.humidity}%</p>
                <p style={metricLabel}>湿度</p>
              </div>
            </div>

            <div style={metricCard}>
              <i className="wi wi-strong-wind" style={metricIcon}></i>
              <div>
                <p style={metricValue}>{weatherData.wind_speed} m/s</p>
                <p style={metricLabel}>风速</p>
              </div>
            </div>

            <div style={metricCard}>
              <i className="wi wi-day-sunny" style={metricIcon}></i>
              <div>
                <p style={metricValue}>{formatTime(weatherData.sunrise)}</p>
                <p style={metricLabel}>日出</p>
              </div>
            </div>

            <div style={metricCard}>
              <i className="wi wi-night-clear" style={metricIcon}></i>
              <div>
                <p style={metricValue}>{formatTime(weatherData.sunset)}</p>
                <p style={metricLabel}>日落</p>
              </div>
            </div>

            <div style={metricCard}>
              <i className="wi wi-raindrop" style={metricIcon}></i>
              <div>
                <p style={metricValue}>{weatherData.visibility / 1000} km</p>
                <p style={metricLabel}>能见度</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
};

// 样式对象
const containerStyle = {
  maxWidth: '600px',
  margin: '2rem auto',
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
  textAlign: 'center'
};

const searchBoxStyle = {
  display: 'flex',
  gap: '10px',
  justifyContent: 'center',
  margin: '20px 0'
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '200px'
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  ':disabled': {
    backgroundColor: '#cccccc'
  }
};

const iconStyle = {
  width: '80px',
  height: '80px'
};

const tempStyle = {
  fontSize: '2.5rem',
  margin: '0',
  fontWeight: 'bold',
  color: '#333'
};

const descriptionStyle = {
  fontSize: '1.2rem',
  color: '#666',
  margin: '5px 0 0 0',
  textTransform: 'capitalize'
};

const errorStyle = {
  color: '#dc3545',
  margin: '10px 0'
};
const headerStyle = {
  paddingBottom: '20px',
  borderBottom: '1px solid #eee',
  marginBottom: '20px'
};

const tempWrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  margin: '15px 0'
};

const cityStyle = {
  margin: '0 0 10px 0',
  color: '#333'
};

const feelsLikeStyle = {
  fontSize: '1rem',
  color: '#666',
  margin: '5px 0 0 0'
};

const gridContainer = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: '15px',
  width: '100%'
};

const metricCard = {
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  padding: '15px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  transition: 'transform 0.2s',
  ':hover': {
    transform: 'translateY(-2px)'
  }
};

const metricIcon = {
  fontSize: '24px',
  color: '#4a90e2'
};

const metricValue = {
  margin: '0',
  fontSize: '1.1rem',
  fontWeight: '600',
  color: '#333'
};

const metricLabel = {
  margin: '5px 0 0 0',
  fontSize: '0.9rem',
  color: '#666'
};

// 调整原有天气卡片样式
const weatherCardStyle = {
  backgroundColor: 'white',
  borderRadius: '16px',
  padding: '30px',
  marginTop: '20px',
  boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
  width: '100%',
  maxWidth: '800px'
};
export default Weather;

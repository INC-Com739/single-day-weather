import React, { useState, useEffect } from "react";

const API_KEY = process.env.VITE_WEATHER_API_KEY;
const DEFAULT_CITY = "New York";

export default function Weather() {
  const [city, setCity] = useState(DEFAULT_CITY);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        );
        if (!res.ok) throw new Error("City not found");
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, [city]);

  function handleChange(e) {
    setCity(e.target.value);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 350 }}>
      <input
        value={city}
        onChange={handleChange}
        placeholder="Enter city"
        style={{
          padding: 10,
          width: 260,
          borderRadius: 6,
          border: '1px solid #bbb',
          marginBottom: 18,
          fontSize: 18,
          outline: 'none',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
        }}
      />
      {loading && <p style={{ color: '#888', fontSize: 18 }}>Loading...</p>}
      {error && <p style={{ color: "#d32f2f", fontWeight: 500, margin: 0 }}>{error}</p>}
      {weather && (
        <div style={{
          background: '#fff',
          borderRadius: 12,
          boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
          padding: 28,
          minWidth: 260,
          textAlign: 'center',
          marginTop: 8
        }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: 28 }}>{weather.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
            style={{ width: 80, height: 80 }}
          />
          <div style={{ fontSize: 40, fontWeight: 600, margin: '8px 0' }}>
            {Math.round(weather.main.temp)}°C
          </div>
          <div style={{ fontSize: 18, color: '#555', textTransform: 'capitalize' }}>
            {weather.weather[0].description}
          </div>
        </div>
      )}
    </div>
  );
}

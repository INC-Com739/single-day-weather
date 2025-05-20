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
    <div style={{ maxWidth: 400 }}>
      <input
        value={city}
        onChange={handleChange}
        placeholder="Enter city"
        style={{ padding: 8, width: "100%", marginBottom: 16 }}
      />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 16 }}>
          <h2>{weather.name}</h2>
          <p style={{ fontSize: 32 }}>{Math.round(weather.main.temp)}°C</p>
          <p>{weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </div>
  );
}

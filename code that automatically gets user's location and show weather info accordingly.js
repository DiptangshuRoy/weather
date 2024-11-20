"use client"
import { useEffect, useState } from 'react';

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Automatically detect location on page load
    detectLocationAndFetchWeather();
  }, []);

  const detectLocationAndFetchWeather = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoordinates(latitude, longitude);
      },
      (err) => {
        setError("Unable to retrieve location.");
        setLoading(false);
      }
    );
  };

  const fetchWeatherByCoordinates = async (latitude, longitude) => {
    const apiKey = 'c0420bbcf3e34ab18e3101148241911';
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data.");
      }

      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Weather Forecast</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {weather && (
        <div className="bg-gray-100 p-4 rounded-md shadow-md mt-4">
          <h2 className="text-lg font-bold">{weather.location.name}</h2>
          <p>Region: {weather.location.region}</p>
          <p>Country: {weather.location.country}</p>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
          <img
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
            className="mt-2"
          />
        </div>
      )}
    </div>
  );
}

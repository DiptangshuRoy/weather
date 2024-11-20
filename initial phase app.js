"use client";
import { useState } from "react";

export default function Home() {
  const [weather, setWeather] = useState(null); // State for weather data
  const [error, setError] = useState(null); // State for error handling
  const [location, setLocation] = useState(""); // State for input location
  const [isFetching, setIsFetching] = useState(false); // State for loading

  const fetchWeatherData = async () => {
    if (!location.trim()) {
      setError("Please enter a valid city name.");
      return;
    }

    setError(null); // Reset any previous errors
    setIsFetching(true); // Set loading to true

    try {
      const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${location}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setWeather(data); // Store weather data
    } catch (err) {
      setError(err.message); // Handle errors
    } finally {
      setIsFetching(false); // Stop loading indicator
    }
  };

  return (
    <div>
      {/* Error message display */}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {/* Input and button */}
      <div>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={fetchWeatherData}>Get Weather</button>
      </div>

      {/* Loading indicator */}
      {isFetching && <p>Fetching Weather Data...</p>}

      {/* Weather info display */}
      {weather && (
        <div className="bg-blue-950">
          <nav className="bg-purple-400 p-4">
            <ul className="flex gap-5 font-bold">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </nav>

          <div className="my-10">
            <div className="flex justify-center">
              <h1>
                Weather in
                <span className="mx-1">{weather.location.name}</span>
              </h1>
            </div>
            <p>Temperature: {weather.current.temp_c}°C</p>
            <p>Condition: {weather.current.condition.text}</p>
          </div>
        </div>
      )}
    </div>
  );
}
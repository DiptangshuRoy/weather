"use client";
import React, { useState, useEffect } from "react";

export default function WeatherComponent() {
  const [weather, setWeather] = useState(null); // State for weather data
  const [error, setError] = useState(null); // State for error handling
  const [location, setLocation] = useState(""); // State for input location
  const [isFetching, setIsFetching] = useState(false); // State for loading
  const [useManualInput, setUseManualInput] = useState(false); // State to switch to manual input

  useEffect(() => {
    // Attempt to detect location on component load
    detectLocationAndFetchWeather();
  }, []);

  const detectLocationAndFetchWeather = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setUseManualInput(true); // Enable manual input
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoordinates(latitude, longitude);
      },
      () => {
        setError("Oops! Looks like location access is denied");
        setUseManualInput(true); // Enable manual input
      }
    );
  };

  const fetchWeatherByCoordinates = async (latitude, longitude) => {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;
    fetchWeather(url);
  };

  const fetchWeatherByCity = async () => {
    if (!location.trim()) {
      setError("Please enter a valid city name.");
      return;
    }
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
    fetchWeather(url);
  };

  const fetchWeather = async (url) => {
    setError(null); // Reset any previous errors
    setIsFetching(true); // Set loading to true

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Please enter city name correctly`);
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
      {error && <div className="flex justify-center items-center h-[35vh]">
        <p className="text-red-500 text-xl text-center underline underline-offset-8">
          {error}
        </p>
      </div>}

      {/* Input and button for manual input */}
      {useManualInput && (
        <div className="flex flex-col gap-5 md:h-[61vh]">
          {/* Show this message only if weather is not fetched */}
          {!weather && (
            <span className="flex justify-center text-center">No Problem! Get Weather info by searching your city name</span>
          )}
          <div className="flex justify-center items-center gap-4 mt-6">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter city name"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchWeatherByCity(); // Trigger the button click function
                }
              }}
              className="px-4 py-2 border rounded-3xl shadow-md w-[80%] max-w-sm max-md:w-[12.5rem]"
            />
            <button onClick={fetchWeatherByCity} className="bg-violet-700 text-white px-4 py-2 rounded-3xl hover:bg-violet-800 shadow-md">Get Weather</button>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {
      isFetching &&
        <div>
          {/* <p className="absolute">Fetching Weather Data...</p> */}
          <video autoPlay loop muted width={135} height={135} className="absolute left-[45vw] top-[38vh] max-md:left-[32.5vw]">
            <source src="Loading.webm" type="video/webm" />
          </video>

          <video autoPlay loop muted width={270} height={110} className="absolute z-30 left-60 top-16 max-md:-left-10">
            <source src="ContentLoading.webm" type="video/webm" />
          </video>
          <video autoPlay loop muted width={270} height={110} className="absolute z-30 left-60 top-80 max-md:-left-10 max-md:top-96">
            <source src="ContentLoading.webm" type="video/webm" />
          </video>
          <video autoPlay loop muted width={270} height={110} className="absolute z-30 left-60 top-[36rem] max-md:left-40 max-md:top-[27.8rem] max-md:scale-50">
            <source src="ContentLoading.webm" type="video/webm" />
          </video>
          <video autoPlay loop muted width={270} height={110} className="absolute z-30 left-[70rem] top-16 max-md:hidden">
            <source src="ContentLoading.webm" type="video/webm" />
          </video>
          <video autoPlay loop muted width={270} height={110} className="absolute z-30 left-[70rem] top-80 max-md:hidden">
            <source src="ContentLoading.webm" type="video/webm" />
          </video>
          <video autoPlay loop muted width={270} height={110} className="absolute z-30 left-[70rem] top-[36rem] max-md:hidden">
            <source src="ContentLoading.webm" type="video/webm" />
          </video>
        </div>
      }

      {/* Weather info display */}
      {weather && (
        <div>
          <div>

            <div className="flex justify-center">
              <div className="flex items-center text-purple-200">
                <h1 className="bg-orange-400 bg-opacity-20 backdrop-blur-sm px-10 py-2 rounded-full border-violet-200 shadow-md text-lg max-md:py-1 max-md:px-5">
                  Weather in
                  <span className="mx-1">{weather.location.name}</span>
                </h1>
                <video autoPlay loop muted width={100} height={100}>
                  <source src="CloudAndSun.webm" type="video/webm" />
                </video>
              </div>
            </div>

            <div className="flex flex-col gap-2 max-md:mt-4">
              {/* 1 Row! */}
              <div className="flex justify-around max-md:flex-col gap-3">
                <div className="flex justify-evenly bg-black rounded-[70px] px-14 py-5 bg-opacity-0 shadow-md backdrop-blur-md gap-9 md:w-[650px] max-md:p-0 max-md:rounded-3xl max-md:backdrop-blur-none">
                  <div className="flex flex-col justify-center items-center gap-3">
                    <p className="bg-red-300 py-7 px-10 text-sm rounded-full bg-opacity-25 max-md:py-1 max-md:px-3">Temperature: {weather.current.temp_c}°C</p>
                    <p className="bg-red-300 py-7 px-10 text-sm rounded-full bg-opacity-25 max-md:py-1 max-md:px-3">Temperature: {weather.current.temp_f}°F</p>
                  </div>

                  <video autoPlay loop muted width={45} height={45}>
                    <source src="Thermometer.webm" type="video/webm" />
                  </video>
                </div>

                <div className="flex justify-evenly bg-black rounded-[70px] px-14 py-5 bg-opacity-0 shadow-md backdrop-blur-md md:w-[650px] max-md:p-0 max-md:rounded-3xl max-md:backdrop-blur-none">
                  <div className="flex flex-col justify-center items-center gap-3">
                    <p className="bg-red-300 py-7 px-10 text-sm rounded-full bg-opacity-25 max-md:py-1 max-md:px-3">Feels like: {weather.current.feelslike_f}°F</p>
                    <p className="bg-red-300 py-7 px-10 text-sm rounded-full bg-opacity-25 max-md:py-1 max-md:px-3">Feels like: {weather.current.feelslike_c}°C</p>
                  </div>

                  <video autoPlay loop muted width={120} height={120}>
                    <source src="UV.webm" type="video/webm" />
                  </video>
                </div>
              </div>

              {/* 2 Row! */}
              <div className="flex justify-around max-md:flex-col gap-6">
                <div className="flex justify-evenly bg-black rounded-[70px] px-14 py-5 bg-opacity-0 shadow-md backdrop-blur-md md:w-[650px] max-md:p-0 max-md:rounded-3xl max-md:backdrop-blur-none">
                  <div className="flex flex-col justify-center items-center gap-3">
                    <p className="bg-red-300 py-7 px-10 text-sm rounded-full bg-opacity-25 max-md:py-1 max-md:px-3">Wind speed: {weather.current.wind_kph}/kph</p>
                    <p className="bg-red-300 py-7 px-10 text-sm rounded-full bg-opacity-25 max-md:py-1 max-md:px-3">Wind speed: {weather.current.wind_mph}mph</p>
                    <p className="bg-red-300 py-7 px-10 text-sm rounded-full bg-opacity-25 max-md:py-1 max-md:px-3">Wind direction: {weather.current.wind_dir}</p>
                  </div>

                  <video autoPlay loop muted width={130} height={130}>
                    <source src="Wind.webm" type="video/webm" />
                  </video>
                </div>

                <div className="flex justify-evenly bg-black rounded-[70px] px-14 py-5 bg-opacity-0 shadow-md backdrop-blur-md md:w-[650px] max-md:p-0 max-md:rounded-3xl max-md:backdrop-blur-none">
                  <div className="flex flex-col justify-center text-center gap-3">
                    <p className="bg-red-300 py-7 px-10 text-sm rounded-full bg-opacity-25 max-md:py-1 max-md:px-3">Condition: {weather.current.condition.text}</p>
                    <p className="bg-red-300 py-7 px-10 text-sm rounded-full bg-opacity-25 max-md:py-1 max-md:px-3">Humidity: {weather.current.humidity}</p>
                    <p className="bg-red-300 py-7 px-10 text-sm rounded-full bg-opacity-25 max-md:py-1 max-md:px-3">UV: {weather.current.uv}</p>
                  </div>

                  <video autoPlay loop muted width={130} height={130}>
                    <source src="Humidity.webm" type="video/webm" />
                  </video>
                </div>
              </div>

              {/* 3 Row! */}
              <div className="flex justify-around max-md:flex-col">
                <div className="flex justify-evenly bg-black rounded-[70px] px-14 py-5 bg-opacity-0 shadow-md backdrop-blur-sm md:w-[650px] max-md:p-0 max-md:rounded-3xl max-md:backdrop-blur-none">
                  <div className="flex flex-col justify-center items-center gap-3">
                    <p className="bg-red-300 py-7 px-10 text-sm rounded-full bg-opacity-25 max-md:py-1 max-md:px-3">Pressure: {weather.current.pressure_mb}mb</p>
                    <p className="bg-red-300 py-7 px-10 text-sm rounded-full bg-opacity-25 max-md:py-1 max-md:px-3">Pressure: {weather.current.pressure_in}in</p>
                  </div>

                  <video autoPlay loop muted width={150} height={150}>
                    <source src="Wind1.webm" type="video/webm" />
                  </video>
                </div>

                <div className="flex justify-evenly bg-black rounded-[70px] px-14 py-5 bg-opacity-0 shadow-md backdrop-blur-sm md:w-[650px] max-md:p-0 max-md:rounded-3xl max-md:backdrop-blur-none">
                  <div className="flex flex-col justify-center items-center gap-3">
                    <p className="bg-red-300 py-7 px-10 text-sm rounded-full bg-opacity-25 max-md:py-1 max-md:px-3">Dewpoint: {weather.current.dewpoint_f}°F</p>
                    <p className="bg-red-300 py-7 px-10 text-sm rounded-full bg-opacity-25 max-md:py-1 max-md:px-3">Dewpoint: {weather.current.dewpoint_c}°C</p>
                  </div>

                  <video autoPlay loop muted width={150} height={150}>
                    <source src="Leafs.webm" type="video/webm" />
                  </video>
                </div>
              </div>

              {/* 4 Row! */}
              {/* <div className="flex">
                <div className="flex bg-black rounded-[70px] px-14 py-5 bg-opacity-40">
                  <black className="flex flex-col justify-around items-center gap-3">
                  </black>

                  <video autoPlay loop muted width={100} height={100}>
                    <source src="Humidity.webm" type="video/webm" />
                  </video>
                </div>
              </div> */}

            </div>

            <div className="relative mt-5 max-md:hidden">
              <div className="absolute flex right-0 items-baseline bg-black bg-opacity-5 rounded-l-xl pr-2 pl-4">
                <video autoPlay loop muted width={70} height={70}>
                  <source src="LeafAndHouse.webm" type="video/webm" />
                </video>
                <p className="ml-3 text-shadow-lg">Last Updated on: {weather.current.last_updated}</p>
              </div>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}

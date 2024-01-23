import React, { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_API_KEY;

const App = () => {
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [weather, setWeather] = useState();
  const [cityName, setCityName] = useState();
  const [inputStr, setInputStr] = useState();

  useEffect(() => {
    getWeatherData();
  }, [lat, lon]);

  useEffect(() => {
    getWeatherFromCityName();
  }, [cityName]);

  async function getWeatherData() {
    if (lat && lon) {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      const data = await res.json();
      console.log(data);
      setCityName("");
      setWeather(data);
    }
  }

  async function getWeatherFromCityName() {
    if (cityName) {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${apiKey}`
      );
      const data = await res.json();
      console.log(data);
      if (data.cod === "404") {
        alert("City Not Found");
      } else {
        setWeather(data);
      }
    }
  }

  function getLocation() {
    if (lat && lon) {
      getWeatherData();
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
        getWeatherData();
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setCityName(inputStr);
  }

  return (
    <div className="bg-sky-200 h-screen">
      <header className="bg-slate-900 text-white text-center p-5">
        <h1 className="text-3xl">Weather App</h1>
      </header>
      <main className="container mx-auto my-8 max-w-lg px-5">
        <div className="text-center">
          <button
            className="bg-sky-500 text-white px-5 py-3 rounded-xl mb-5"
            onClick={getLocation}
          >
            Get Weather From Current Location
          </button>
          <form onSubmit={handleSubmit}>
            <input
              className="px-5 py-3 mb-5 rounded-l-xl"
              type="text"
              placeholder="City name..."
              required
              onChange={(e) => setInputStr(e.target.value)}
            />
            <button
              className="bg-sky-500 text-white px-5 py-3 mb-5 rounded-r-xl"
              type="submit"
            >
              Get Weather
            </button>
          </form>
        </div>

        {weather && (
          <div className="mt-5">
            <div className="flex flex-col lg:grid grid-cols-2 gap-5">
              <div className="bg-sky-100 p-5 rounded-xl lg:aspect-square">
                <h2 className="text-3xl font-bold">{weather.main.temp} º</h2>
                <p>{weather.weather[0].main}</p>
              </div>

              <div className="bg-sky-100 p-5 rounded-xl lg:aspect-square">
                <h3 className="text-xl font-bold">{weather.name}</h3>
                <p className="text-lg">
                  {weather.main.temp_min} º / {weather.main.temp_max} º
                </p>
                <p>Feels Like: {weather.main.feels_like} º</p>
              </div>
            </div>
            <br />
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-sky-100 p-5 rounded-xl aspect-square flex flex-col items-center justify-center">
                <b>Humidity:</b> {weather.main.humidity}%
              </div>
              <div className="bg-sky-100 p-5 rounded-xl aspect-square flex flex-col items-center justify-center">
                <b>Wind:</b> {weather.wind.speed} km/h
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;

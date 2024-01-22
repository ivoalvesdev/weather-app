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
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setCityName(inputStr);
  }

  return (
    <div>
      <header>
        <h1>Weather App</h1>
      </header>
      <main>
        <button onClick={getLocation}>Get Weather From Current Location</button>
        <br />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="City name..."
            required
            onChange={(e) => setInputStr(e.target.value)}
          />
          <button type="submit">Get Weather</button>
        </form>

        {weather && (
          <div>
            <div>
              <h2>{weather.main.temp} º</h2>
              <p>{weather.weather[0].main}</p>
            </div>
            <br />
            <div>
              <h3>{weather.name}</h3>
              <p>
                {weather.main.temp_min} º / {weather.main.temp_max} º
              </p>
              <p>Feels Like: {weather.main.feels_like} º</p>
            </div>
            <br />
            <div>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind: {weather.wind.speed} km/h</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;

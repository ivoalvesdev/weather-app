import React, { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_API_KEY;

const App = () => {
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();
  const [weather, setWeather] = useState();

  useEffect(() => {
    getWeatherData();
  }, [lat, lon]);

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

  function getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  }

  function formatTime(date) {
    let hours = date.getUTCHours().toString().padStart(2, "0");
    let minutes = date.getUTCMinutes().toString().padStart(2, "0");
    let seconds = date.getUTCSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  return (
    <div>
      <header>
        <h1>Weather App</h1>
      </header>
      <main>
        <button onClick={getLocation}>Get Weather</button>
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

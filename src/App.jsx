import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa6";

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
    <div className="bg-gradient-to-tr from-75% from-sky-200 to-amber-100 h-screen">
      <header className="bg-slate-900 text-white text-center p-3">
        <h1 className="text-2xl">Weather App</h1>
      </header>
      <main className="container mx-auto my-8 max-w-2xl px-5">
        <div className="text-center">
          <button
            className="bg-sky-500 hover:bg-sky-600 transition-all text-white px-5 py-3 rounded-full mb-5 aspect-square text-xl shadow"
            onClick={getLocation}
          >
            <FaLocationCrosshairs />
          </button>
          <form onSubmit={handleSubmit}>
            <input
              className="px-5 py-3 mb-5 rounded-l-xl shadow"
              type="text"
              placeholder="City name..."
              required
              onChange={(e) => setInputStr(e.target.value)}
            />
            <button
              className="bg-sky-500 hover:bg-sky-600 transition-all text-white px-5 py-3 mb-5 rounded-r-xl shadow"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>

        {weather && (
          <div className="mt-5">
            <div className="flex flex-col sm:grid grid-cols-2 gap-5">
              <div className="bg-sky-100  hover:bg-sky-50 transition-all p-5 rounded-xl sm:aspect-square flex sm:flex-col items-center sm:justify-center gap-5  shadow">
                <img
                  className="bg-sky-200 rounded-full sm:mb-3"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="icon"
                />
                <div>
                  <h2 className="text-3xl font-bold">{weather.main.temp} º</h2>
                  <p>{weather.weather[0].main}</p>
                </div>
              </div>

              <div className="bg-sky-100  hover:bg-sky-50 transition-all p-5 sm:p-10 rounded-xl sm:aspect-square shadow">
                <h3 className="text-xl font-bold flex items-center gap-3">
                  <FaLocationDot />
                  {weather.name}
                </h3>
                <p className="text-lg font-bold mt-3">
                  {weather.main.temp_min} º / {weather.main.temp_max} º
                </p>
                <p>Feels Like: {weather.main.feels_like} º</p>
              </div>
            </div>
            <br />
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-sky-100  hover:bg-sky-50 transition-all p-5 rounded-xl aspect-square flex flex-col items-center justify-center shadow">
                <div className="text-6xl text-sky-600">
                  <WiHumidity />
                </div>
                <b className="text-lg">{weather.main.humidity}%</b>
              </div>
              <div className="bg-sky-100  hover:bg-sky-50 transition-all p-5 rounded-xl aspect-square flex flex-col items-center justify-center shadow">
                <div className="text-4xl text-slate-600">
                  <FaWind />
                </div>
                <b className="text-lg">{weather.wind.speed} km/h</b>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;

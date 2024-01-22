import React, { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_API_KEY;

const App = () => {
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();

  useEffect(() => {
    getWeatherData();
  }, [lat, lon]);

  async function getWeatherData() {
    if (lat && lon) {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      const data = await res.json();
      console.log(data);
    }
  }

  function getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);
    });
  }

  return (
    <div>
      <main>
        <button onClick={getLocation}>Get Weather</button>
      </main>
    </div>
  );
};

export default App;

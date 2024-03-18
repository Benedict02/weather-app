import { useEffect, useState } from "react";
import MapEngine from "./MapEngine";

function WeatherDisplay() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

  useEffect(() => {
    if (location) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${apiKey}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeather(data);
          console.log(data);
        })
        .catch((error) => console.log(error));
    }
  }, [location, apiKey]);

  const handleLocationClick = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  };

  function success(position) {
    const { latitude, longitude } = position.coords;
    setLocation({ latitude, longitude });
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  return (
    <div>
      {!location ? (
        <button onClick={handleLocationClick}>Get Location</button>
      ) : null}
      {location && !weather ? <p>Loading weather data...</p> : null}
      {weather ? (
        <div>
          <p>Location: {weather.name}</p>
          <p>
            Latitude : {weather.coord.lat} Longitude : {weather.coord.lon}
          </p>

          <p>Temperature: {weather.main.temp} °C</p>
          <p>Feels like {weather.main.feels_like}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      ) : null}
      {location && (
        <>
          <MapEngine lat={location.latitude} long={location.longitude} />
        </>
      )}
      {/* USE LEAFLET NEXT TIME YA */}
    </div>
  );
}

export default WeatherDisplay;

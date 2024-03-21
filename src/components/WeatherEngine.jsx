import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
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
          <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={20}
            scrollWheelZoom={false}
            style={{ width: "900px", height: "600px", position: "absolute" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </>
      )}
    </div>
  );
}

export default WeatherDisplay;

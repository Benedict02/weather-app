import WeatherDisplay from "../components/WeatherEngine";

function Weather() {
  return (
    <>
      <div className="container">
        <h1>This is the Weather Page</h1>
        <WeatherDisplay></WeatherDisplay>
      </div>
    </>
  );
}

export default Weather;

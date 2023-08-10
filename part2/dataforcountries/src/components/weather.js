import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital, latlng }) => {
  const [weather, setWeather] = useState({
    temp: null,
    img: [],
    wind: null,
    dir: null,
  });
  // https://api.openweathermap.org/data/3.0/onecall?lat=64&lon=26&appid=f4f812ef7988efdcb327e8b2fbdef92c
  const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY;
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${weather_api_key}`
      )
      .then((response) => {
        setWeather({
          temp: response.data.main.temp,
          img: response.data.weather[0].icon,
          wind: response.data.wind.speed,
          deg: response.data.wind.deg,
          hum: response.data.main.humidity,
        });
      });
  }, [weather_api_key, latlng]);

  return (
    <>
      <h3>Weather in {capital}</h3>
      <div>
        <strong>temperature:</strong> {weather.temp} Celcius
      </div>
      <div>
        <strong>wind:</strong> {weather.wind} mph, degree {weather.deg}
      </div>
      <div>
        <strong>humidity:</strong> {weather.hum}g/m3
      </div>
      <div>
        <img
          key={weather.img}
          src={`https://openweathermap.org/img/wn/${weather.img}@2x.png`}
          alt="Icon"
        />
      </div>
    </>
  );
};

export default Weather;

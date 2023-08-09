import React, { useState, useEffect } from "react"
import axios from 'axios' 

const Weather = ({capital}) => {
    const [weather, setWeather] = useState({
                                    temp : null,
                                    img  : [],
                                    wind : null,
                                    dir  : null,
                                })
                                
    const weather_api_key = process.env.REACT_APP_WEATHER_API_KEY
    console.log('sf',weather_api_key);
    useEffect(() => {
        axios
          .get(`http://api.weatherstack.com/current?access_key=${weather_api_key}&query=${capital}`)
          .then(response => {
            console.log('ee',response.data);
            setWeather({
                temp : response.data.current.temperature,
                img  : response.data.current.weather_icons,
                wind : response.data.current.wind_speed,
                dir  : response.data.current.wind_speed.wind_dir,
            })
          })
      }, [weather_api_key, capital])

    return (
        <>
            <h3>Weather in {capital}</h3>
            <div><strong>temperature:</strong> {weather.temp} Celcius</div>
            <div>
                {weather.img.map((img) => <img key={img} src={img} alt='Icon' />)}
            </div>
            <div><strong>wind:</strong> {weather.wind} mph direction {weather.dir}</div> 
        </>
    )
}

export default Weather
import React, { useState, useEffect } from "react";
import DateRangeIcon from '@mui/icons-material/DateRange';


function WeatherDetails({
  temp,
  humidity,
  pressure,
  weatherType,
  name,
  speed,
  country,
  sunset,
  tempUnit
}) {
  const [weatherState, setWeatherState] = useState("");
  useEffect(() => {
    if (weatherType) {
      switch (weatherType) {
        case "Clouds":
          setWeatherState("wi-day-cloudy");
          break;
        case "Haze":
          setWeatherState("wi-fog");
          break;
        case "Clear":
          setWeatherState("wi-day-sunny");
          break;
        case "Mist":
          setWeatherState("wi-dust");
          break;
        case "Rain":
          setWeatherState("wi-day-rain");
          break;

        default:
          setWeatherState("wi-day-sunny");
          break;
      }
    }
  }, [weatherType]);



  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  // const prsntDate = `${day}/${month}/${year}`
  const hour = d.getHours();
  const min = d.getMinutes();
  const scnd = d.getSeconds();
  //conveting the seconds in time
  let sec = sunset;
  let date = new Date(sec * 1000);
  let timeStr = `${date.getHours()}:${date.getMinutes()}`;

  //C/F
  const convertTempUnit = (temp, tempUnit) => {
    if (tempUnit === "°F") {
      return Math.round(((temp -273.15)*9)/5 +32);
    } else {
      return temp;
    }
  };

  return (
  <>
    <div className="widget">
      <div className="weatherIcon">
        <i className={`wi ${weatherState}`}></i>
      </div>

      <div className="row2">

        <div className="weatherInfo">

            <div className="temp-container">
               <div className="temperature">
                  <span>{convertTempUnit(temp, tempUnit)} </span> <br/>
                  <span className="temperature-unit">{tempUnit}</span>
               </div>
            </div>

           <div className="description-container">
              <div className="weatherCondition">
                {weatherType}
              </div>
              <div className="place">
                {name}, {country}
              </div>
            </div>

        </div>

        <div className="date-time-box">
          <div className="date">
            {`${day}/${month}/${year}`}
          </div>
          <div className="time">
            {`${hour}:${min}:${scnd}`}
          </div>
        </div>
      </div>
      
    <div className="extra-details">
        <div className="detail-containers">
          <div className="two-sided-section">
              <p>
                <i className={"wi wi-sunset"}></i>
              </p>
              <p className="extra-info-leftside">
                {timeStr} <br />
                Sunset
              </p>
          </div>

          <div className="two-sided-section">
              <p>
                <i className={"wi wi-humidity"}></i>
              </p>
              <p className="extra-info-leftside">
                {humidity} <br />
                Humidity
              </p>
          </div>
        </div>

        <div className="weather-extra-info">
           <div className="two-sided-section">
              <p>
                <i className={"wi wi-rain"}></i>
              </p>
              <p className="extra-info-leftside">
                {pressure} <br />
                Pressure
              </p>
            </div>

            <div className="two-sided-section">
              <p>
                <i className={"wi wi-strong-wind"}></i>
              </p>
              <p className="extra-info-leftside">
                {speed} <br />
                Speed
              </p>
            </div>

        </div>
      </div>
    </div>
  </>
  );
}

export default WeatherDetails;

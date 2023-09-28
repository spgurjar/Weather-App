import React, { useEffect, useState } from "react";
import "../components/style.css";
import WeatherDetails from "./WeatherDetails";

function SearchMain() {
  const [searchTerm, setSearchTerm] = useState("roorkee");
  const [tempInfo, setTempInfo] = useState({});
  const [tempUnit, setTempUnit] = useState("°C");

  const getWeatherInfo = async () => {
    try {
    
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=${tempUnit}&appid=f840f08444c59ce09a2fbb87f9bff214`;

      let res = await fetch(url);
      let data = await res.json();
      const { temp, humidity, pressure } = data.main;
      const { main: weatherType } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weatherType,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
      // console.log(data);
    
    } catch (error) {
      window.alert("Please Enter Correct City Name")
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  const handleTempUnitChange = () => {
    setTempUnit(tempUnit === "K" ? "°F" : "K");
  };

return (
  <>
  <div className="body-container">
    <div className="wrap">
      <div className="search">
        <input
            type="search"
            className="search-input"
            placeholder="Search city.."
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="searchButton" onClick={getWeatherInfo}>
            Search
       </button>
       <div className="temp-toggle">
          <input
              type="checkbox"
              checked={tempUnit === "K"}
              onChange={handleTempUnitChange}
          />
        <label className="temp-toggle-unit" for="temp-unit">K</label>
        </div>
      </div>
    </div>

    {/* This the the weather details page */}
    <WeatherDetails {...tempInfo} tempUnit={tempUnit}/>
  </div>
</>
);
}

export default SearchMain;

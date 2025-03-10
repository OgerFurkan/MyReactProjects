import React from 'react'
import "../css/mainWeather.css"
import { FaSearch } from "react-icons/fa";
import { TbTemperatureCelsius } from "react-icons/tb";
import SearchBar from "./SearchBar"

function MainWeather( {location, setLocation, weather, getDayOfWeek}) {
  return (
    <>
        <div className="main">
            <SearchBar location={location} setLocation={setLocation}>
                <FaSearch/>
            </SearchBar>
            <div className="info">
                <div className="degree">
                    <div>
                        {
                            weather ? (weather.list[0].main.temp).toFixed(1) : ""
                        }
                        <div><TbTemperatureCelsius /></div>
                    </div>
                </div>
                <div className="city">

                    <p className="city-name">
                        {weather ? weather.city.name.split(" ")[0] : "Şehir" }
                    </p>

                    <p className="city-day">
                    {   
                            weather ? getDayOfWeek(weather.list[0].dt_txt) : "Gün"  
                    }
                     </p>

                    <p className="date">
                        {
                           weather ?  weather.list[0].dt_txt.split(" ")[0] : "Tarih"
                        }
                    </p>

                </div> 
                <div className="weather-icon">
                    <div>
                        {
                            weather ? <img src={`http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`}/> : ""
                        }
                        <p className="weather-description">
                            {
                                weather ? weather.list[0].weather[0].description.toUpperCase() : "-"
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>

    </>
    );
  }
export default MainWeather
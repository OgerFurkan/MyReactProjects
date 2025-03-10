import React from 'react'
import "../css/days.css"
import { TbTemperatureCelsius } from "react-icons/tb";
import { getDayOfWeek } from "./Weather"

function Days( {weather, index}) {

  return (
    <div className="day">
        <div className="day-name">
          {
            getDayOfWeek(weather.list[index].dt_txt)
          }
        </div> 
        <div className="day-info">
            <div className="day-degree">
              <div> 
                  {
                    (weather.list[index].main.temp).toFixed(1)
                  }
              </div>
                <div><TbTemperatureCelsius /></div>
            </div>
            <div className="day-icon">
              <i>
                {
                 <img src={`http://openweathermap.org/img/wn/${weather.list[index].weather[0].icon}@2x.png`}/>
                }
              </i>
            </div>
           <div className="day-description">
              {
                weather.list[index].weather[0].description.toUpperCase()
              }
          </div>
        </div>
    </div>
  );
}

export default Days

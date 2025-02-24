import React from 'react'
import "../css/mainWeather.css"

function MainWeather() {
  return (

    <>
        <div className="main">
            <div className="search-bar">
            <input type="text" placeholder="Şehir İsmi Giriniz..."/>
             </div>
            <div className="info">
                <div className="degree">
                    <div>25°C</div>
                </div>
                <div className="city">
                    <p className="city-name">Istanbul</p>
                    <p className="city-country">Türkiye</p>
                    <p className="date">24.02.2025</p>
                </div> 
                <div className="weather-icon">
                icon
                </div>
            </div>
        </div>

    </>
    );
  }
export default MainWeather
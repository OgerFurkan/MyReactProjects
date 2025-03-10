import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import MainWeather from "./MainWeather" 
import Days from "./Days"
import "../css/Weather.css"

export const getDayOfWeek=(dateString)=> {  
    const date = new Date(dateString); 
    return date.toLocaleDateString('tr-TR', { weekday: 'long' });
  }  

function Weather() {
    const [location, setLocation] = useState("")
    const [weather, setWeather] = useState("")
    const APIKey = "0a258eccb914d0966fe7f6ff02317dea"
    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${APIKey}&units=metric&cnt=32&lang=tr`

    const getWeather = async () => {
        try {
            const response = await axios.get(URL)
            setWeather(response.data)
        } catch (error) {
            console.error(error)
        }
    }      

    useEffect(() => {
        if (location === "") return
        getWeather()
    }, [location])

    console.log(weather)

    return (
            <div className="container">
            <MainWeather location={location} setLocation={setLocation} weather={weather} getDayOfWeek={getDayOfWeek} />
            
            {
                weather && (
                    <div className="days">
                    {
                        weather && (
                            <>
                            <Days weather={weather} index={5}/>
                            <Days weather={weather} index={13}/>
                            <Days weather={weather} index={21}/>
                            <Days weather={weather} index={29}/>
                            </>
                        )
                    }
                </div>
                )
            }    
            </div>
    );
}

export default Weather
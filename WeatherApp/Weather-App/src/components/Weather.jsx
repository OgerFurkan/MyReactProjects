import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import MainWeather from "./mainWeather" 
import "../css/Weather.css"
import Days from "./Days"
function Weather() {
    const [location, setLocation] = useState("")
    const [weather, setWeather] = useState("")
     const APIKey= "0a258eccb914d0966fe7f6ff02317dea"
    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${APIKey}&units=metric&cnt=32&lang=tr
`
  
    const getWeather = async () => {
        try
        {
            const response = await axios.get(URL)
            setWeather(response.data)
        }
        catch (error)
        {
            console.error(error)
        }
    }      

    // useEffect(() => {
    //     if (location === "") return
    //     getWeather()
    // }
    // , [location])
 

  
    
  return (
    <div className="container">
        <MainWeather>
        </MainWeather>
       <div className="days">
            <Days></Days>
            <Days></Days>
            <Days></Days>
            <Days></Days>
       </div>

    </div>

    
  );
}

export default Weather
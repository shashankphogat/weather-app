import { useEffect, useRef, useState} from 'react'
import './App.css'
import clear_icon from "../public/clear.png"
import cloud_icon from "../public/cloud.png"
import drizzle_icon from "../public/drizzle.png"
import rain_icon from "../public/rain.png"
import snow_icon from "../public/snow.png"
import humidity_img from "../public/humidity.png"
import search_img from "../public/search.png"
import wind_img from "../public/wind.png"


function App() {

  const inputRef=useRef();

  const [weather_data,setWeather_data]=useState(false);

  const allIcons={
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  }

  const search=async(city)=>{
    if(city===""){
      alert("Please enter a city");
      return;
    }
    try{
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}&units=metric`;
    const response= await fetch(url).then(data=> data.json()).then(jsonData=>{return {status:"ok",data:jsonData}}).catch(error=>{return {status:"nok",error:error}});
    if(response.status==="ok" && response.data.message!=="city not found"){
      const icon=allIcons[response.data.weather[0].icon] || clear_icon;
    setWeather_data({
      temp: response.data.main.temp,
      humidity: response.data.main.humidity,
      city: response.data.name,
      wind: response.data.wind.speed,
      icon:icon
    }
  )
    }else if(response.data.message==="city not found"){
      alert("City not found");
    }
    else{
      alert(response.error.message)
    }
  }
    catch(error){
      console.log(error);
    }
   
  }

  useEffect(()=>{
    search("london")
  },[])

  return (
    <>
    <div className='card'>
    <div className="search_row">
        <input placeholder='Search' ref={inputRef}></input>
        <img src={search_img} alt="Search_icon" onClick={()=>search(inputRef.current.value)}></img>
    </div>
    {weather_data?<>
    <img src={weather_data.icon} alt="Weather_icon" className='weather_image' ></img>
    <p className="temp">{weather_data.temp}°c</p>
    <p className='city'>{weather_data.city}</p>
    <div className='Humidity_wind_row'>
      <div className='Humidity_flex'>
        <img src={humidity_img} alt="Humidity_icon" className='humidity_img'></img>
        <div>
          <p>{weather_data.humidity}%</p>
          <p>Humidity</p>
        </div>
      </div>
      <div className='Wind_flex'>
        <img src={wind_img} alt="Wind_icon" className='wind_img'></img>
        <div>
          <p>{weather_data.wind} Km/h</p>
          <p>Wind Speed</p>
        </div>
      </div>
    </div>
    </>
    :<></>}
    </div>
    </>
  )
}

export default App

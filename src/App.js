import React, { useState } from 'react';
import GifImage from "./weatherstat.jpg"


function App() {

  const [cityInput, setCityInput] = useState("London");


  const [weatherData, setweatherData] = useState(null);

  const [showContainer, setShowContainer] = useState(false);


  
  const Api_Key = "process.env.REACT_APP_API_KEY"
 

  async function fetchWeatherData (Api_Key, cityInput){

    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${Api_Key}&q=${cityInput}`);

    try {
    if (response.ok) {
      const data = await response.json();
      setweatherData(data);
      setShowContainer(true);
    } else {
      console.log("Failed to fetch data")
    }
   } catch(error) {
      console.error ("Error fetching data" ,  error)}

    }

  function handleInputChange(event) {
   
      setCityInput(event.target.value) 

    }

  function handleKeyPress(event){
    if(event.key === "Enter") {
      
      fetchWeatherData(Api_Key ,cityInput)
    }
  }
  // useEffect(()=> {
    
  //   if(cityInput) {
  //   fetchWeatherData(Api_Key, cityInput)
  // }}, [Api_Key, cityInput] );

  const toDate = () => {

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]}, ${
      months[currentDate.getMonth()]} ${currentDate.getDate()
    }`;
    return date;
  };

  return (

<div>
  <div > <input className="input" name="input" type="text" onKeyDown={handleKeyPress} onChange={handleInputChange} placeholder='Enter City Name' /> </div>
{showContainer? 
 <div className="container">
        {weatherData ?
        <div className="middle">
            <div className="weatherbox">
                <div className="city"> <h2>{weatherData.location.name} </h2></div>
                <div className="country"> <h2 > {weatherData.location.country}</h2></div>
            </div>
            <div className="gif"> <img style={{height :"100px"}} src={`https:${weatherData.current.condition.icon}`} alt="sunImage"/> </div>
        </div> : null }   
        
        {weatherData ?     
      <div className='bottombox'>
        <h2 className="temp">{Math.floor(weatherData.current.temp_c)} &deg;C</h2>
        <h2 className="condition">{weatherData.current.condition.text}</h2>
        <p className="date">{toDate()} </p> </div> : null }  
        </div>: <img style={{height:"340px"}} src={GifImage} alt='weatherpic'/> }
        </div>  
  )}

export default App;
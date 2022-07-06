import React, { useState } from 'react'
import axios from 'axios'
import './app.css'

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState({
    lat: '',
    long: '',
  });



  //const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.long}&hourly=temperature_2m&current_weather=true`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  const handleLat = (event) => {
    event.persist();
    setLocation((values) => ({
      ...values,
      lat: event.target.value,
    }));
  };
  const handleLong = (event) => {
    event.persist();
    setLocation((values) => ({
      ...values,
      long: event.target.value,
    }));
  };
  const handleSubmit = (event) => {
    axios.get(url).then((response) => {
      setData(response.data)
      console.log(response.data)
    })
    setLocation('')
    event.preventDefault();
  };

  return (
    <div className="app">
      <div className="search">
        <form onSubmit={handleSubmit}>
          <input
            value={location.lat}
            onChange={handleLat}
            // onKeyPress={searchLocation}
            placeholder='Enter Latitude'
            name='coordLat'
            type="text" />
          <input
            value={location.long}
            onChange={handleLong}
            // onKeyPress={searchLocation}
            name="coordLong"
            placeholder='Enter Longitude'
            type="text" />
          <input type="submit" value="Submit" />
        </form>

      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.latitude}</p>
          </div>
          <div className="temp">
            {data.current_weather ? <h1>{data.current_weather.temperature.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.current_weather ? <p>{data.current_weather.windspeed}</p> : null}
          </div>
        </div>

        {/* {data.name !== undefined && */}
        <div className="bottom">
          <div className="feels">
            {data.current_weather ? <p className='bold'>{data.current_weather.windspeed}</p> : null}
            <p>Wind Speed</p>
          </div>
          <div className="humidity">
            {data.current_weather ? <p className='bold'>{data.current_weather.temperature}°C</p> : null}
            <p>Temperature</p>
          </div>
          <div className="wind">
            {data.current_weather ? <p className='bold'>{data.current_weather.winddirection}</p> : null}
            <p>Wind Direction</p>
          </div>
        </div>
        {/* } */}



      </div>
    </div>
  );
}

export default App;
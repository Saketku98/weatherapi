import React,{ useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

function App() {


  const apiKey = "f56f24967aaf51182d1d4df628297c6d"
  const [City, setCity] = useState("")
  const [data, setData] = useState({})


  const getWetherDetails = (cityName) => {
    if (!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
    axios.get(apiURL).then((res) => {
      console.log("response", res.data)
      setData(res.data)
    }).catch((err) => {
      console.log("err", err)
    })
  }

  const handleChangeInput = (e) => {
    console.log("value", e.target.value)
    setCity(e.target.value)
  }

  const handleSearch = () => {
    getWetherDetails(City)
  }


  return (
    <div className="col-md-12">
      <div className="weather">
        <h1 className="heading">React Weather App</h1>

        <div className="d-grid gap-3 col-4 mt-4">
          <input type="text" className="form-control"
            value={City}
            onChange={handleChangeInput} />
          <button className="btn btn-primary" type="button"
            onClick={handleSearch}
          >Search</button>
        </div>
      </div>

      {Object.keys(data).length > 0 &&
        <div className="col-md-12 text-center mt-5">

          <div className="shadow rounded box">
            <img className="Icon"
              src="https://freepngimg.com/thumb/weather/76818-forecasting-material-rain-shower-weather-icon.png" alt="sunset" />

            <h5 className="City">
              {data?.name}
            </h5>
            <h6 className="Temp">{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>
            <h6 className="humidity">{(data?.main?.humidity)} %<br /><bold>Humidity</bold></h6>
          </div>
        </div>
      }

    </div>
  );
}

export default App;

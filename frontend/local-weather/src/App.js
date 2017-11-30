import React, { Component } from "react";
//===========Styles==================
import "normalize.css";
// import "./app.scss"; // wont compile in build task
import "./app.css"; // hence this one

//=============Components=======
import api from "./api";
import WeatherComponent from "./components/WeatherComponent";
import SearchComponent from "./components/SearchComponent";
import Icon from "./components/Icon";

//=======CONTAINER================================

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: {}
    };
    this.searchByCity = this.searchByCity.bind(this);
  }
  componentDidMount() {
    this.getLocalWeather();
  }
  searchByCity(cityName) {
    api
      .searchWeather(cityName)
      .then(response => this.setState({ weatherData: response.data }));
  }
  getLocalWeather() {
    api
      .getLocalWeather()
      .then(response => this.setState({ weatherData: response.data }));
  }
  render() {
    const {
      name,
      sys,
      weather,
      main,
      wind,
      rain,
      clouds
    } = this.state.weatherData;

    return (
      <div className="App">
        {weather
          ? <div>
              <WeatherComponent
                city={`${name}, ${sys.country.toUpperCase()}`}
                weatherCode={weather[0].id}
                weatherDescription={weather[0].description}
                temperature={main.temp}
                windSpeed={wind.speed}
                humidity={main.humidity}
                rain={rain ? rain : null}
                clouds={clouds.all}
                pressure={main.pressure}
              />
              <SearchComponent onSearch={this.searchByCity} />
            </div>
          : <div className="loading">
              <Icon className="wi-cloud-refresh" />
            </div>}
      </div>
    );
  }
}
export default App;

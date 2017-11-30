import Axios from "axios";

const KEYS = {
  ipfind: "d6f46156-9696-45cc-8d07-fe6c30dbed0f",
  openweathermap: "55175e9a873159d3fa89b9c5629b4aea"
};

let Api = {
  /*
   * Get Location then Weather Data
  */
  getLocalWeather() {
    const weatherUrl = "http://api.openweathermap.org/data/2.5/weather";
    return Axios.get(`http://ipfind.co/me?auth=${KEYS.ipfind}`)
      .then(location => {
        return Axios.get(weatherUrl, {
          params: {
            lat: location.data.latitude,
            lon: location.data.longitude,
            units: "metric",
            APPID: KEYS.openweathermap
          }
        });
      })
      .catch(err => {
        console.warn("there was a problem with the data : fetching dummy Data.\n", err);
        // return Api.dummyData;
      });
  },
  /*
   *Search by City Name
   */
  searchWeather(cityName) {
    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}`;
    return Axios.get(weatherUrl, {
      params: {
        units: "metric",
        APPID: KEYS.openweathermap
      }
    }).catch(err => {
      console.log("There seems to be a network problem, try again later \n", err);
    });
  },
  dummyData: {
    data: {
      // dummyData.data to match call in app.jsx
      coord: {
        lon: -15.98,
        lat: 18.09
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "02d"
        }
      ],
      base: "stations",
      main: {
        temp: 22.03,
        pressure: 1028.95,
        humidity: 78,
        temp_min: 22.03,
        temp_max: 22.03,
        sea_level: 1029.14,
        grnd_level: 1028.95
      },
      wind: {
        speed: 4.27,
        deg: 27.5008
      },
      clouds: {
        all: 8
      },
      dt: 1485110659,
      sys: {
        message: 0.01,
        country: "MR",
        sunrise: 1485070706,
        sunset: 1485111196
      },
      id: 2377450,
      name: "Nouakchott",
      cod: 200
    }
  }
};

export default Api;

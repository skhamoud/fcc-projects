import React from "react";
import { icons } from "../helpers";
import TempComponent from "./TempComponent";
import Icon from "./Icon";
// ============================================
function Weather(props) {
  return (
    <div className="weather">
      <h2>
        {props.city}{" "}
      </h2>
      <div className="wb wb__status">
        <Icon weatherCode={props.weatherCode} title="Weather Status" />
        <div>
          {props.weatherDescription}
        </div>
      </div>
      <TempComponent temperature={props.temperature} />
      <div className="wb weather__row">
        <span>
          <Icon className={icons.wind} title="Wind" />
          <br />
          {props.windSpeed} m/s
        </span>
        <span>
          <Icon className={icons.humidity} title="humidity" />
          <br />
          {props.humidity} %
        </span>
        <span>
          <Icon className={icons.pressure} title="pressure" />
          <br />
          {Number(props.pressure).toFixed(0)} hpa
        </span>
      </div>
    </div>
  );
}
export default Weather;

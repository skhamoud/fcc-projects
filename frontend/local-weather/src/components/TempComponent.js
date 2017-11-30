import React from "react";
import Icon from "./Icon";
import { icons } from "../helpers";

export default class TempComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleTemp = this.handleTemp.bind(this);
    this.state = { unit: "C" };
  }
  handleTemp() {
    this.setState(prevState => ({ unit: prevState.unit === "F" ? "C" : "F" }));
  }

  render() {
    const newTemp = Math.floor(this.props.temperature);
    const unit = this.state.unit;
    const temp = unit === "C" ? newTemp : newTemp * 1.8 + 32;
    return (
      <div className="wb wb__temp">
        <Icon className={icons.temperature} title="Temperature" />
        <span className="wb__temp-number">
          {Math.floor(temp)}
        </span>
        <button className="wb__temp-btn" onClick={this.handleTemp}>
          &deg;{unit}
        </button>
      </div>
    );
  }
}

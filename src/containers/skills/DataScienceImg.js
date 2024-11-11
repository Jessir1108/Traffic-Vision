import React, { Component } from "react";
import DataScienceSVG from "../../assets/images/data_science.svg";

export default class DataScienceImg extends Component {
  render() {
    const theme = this.props.theme;
    return (
      <img
        src={DataScienceSVG}
        alt="Data Science"
        style={{ width: "300%", height: "auto", fill: theme.text }}
      />
    );
  }
}

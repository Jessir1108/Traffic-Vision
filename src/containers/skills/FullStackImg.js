import React, { Component } from "react";
import licensePlate from "../../assets/images/fullstack.svg";

export default class FullStackImg extends Component {
  render() {
    const theme = this.props.theme;
    return (
      <img
        src={licensePlate}
        alt="Data Science"
        style={{ width: "300%", height: "auto", fill: theme.text }}
      />
    );
  }
}

import React, { Component } from "react";
import speedLimit from "../../assets/images/cloud_infrastructure.svg";

export default class CloudInfraImg extends Component {
  render() {
    const theme = this.props.theme;
    return (
      <img
        src={speedLimit}
        alt="Speed Limit"
        style={{ width: "80%", height: "auto", fill: theme.text }}
      />
    );
  }
}

import React, { Component } from "react";
import LaneDetection from "../../assets/images/ui_ux_design.svg";

export default class DesignImg extends Component {
  render() {
    const theme = this.props.theme;
    return (
      <img
        src={LaneDetection}
        alt="Data Science"
        style={{ width: "100%", height: "auto", fill: theme.text }}
      />
    );
  }
}

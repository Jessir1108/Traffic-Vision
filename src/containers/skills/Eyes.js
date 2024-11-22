import React, { Component } from "react";
import Eyes from "../../assets/images/eyes.svg";

export default class EyesImg extends Component {
  render() {
    const theme = this.props.theme;
    return (
      <img
        src={Eyes}
        alt="Data Science"
        style={{ width: "100%", height: "auto", fill: theme.text }}
      />
    );
  }
}

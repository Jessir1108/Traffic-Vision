import React, { Component } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import Educations from "../../containers/education/Educations";
import CustomTable from "../../components/customTable/customTable";
import VideoCard from "../../components/videoCard/VideoCard";
import "./EducationComponent.css";
import { Fade } from "react-reveal";

function importAll(r) {
  return r.keys().map(r);
}

const videos = importAll(
  require.context("../../assets/images/gifs", false, /\.gif$/)
);

const videoInfo = {
  0: {
    plate: "IRV504",
    speed: "53.98 KM/H",
    type: "❌ Wrong lane for this speed",
  },
  1: {
    plate: "GJN313",
    speed: "52.14 KM/H",
    type: "❌ Wrong lane for this speed",
  },
  2: {
    plate: "WPX489",
    speed: "38.12 KM/H",
    type: "🐢 Very slow for this lane",
  },
};

class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detections: [],
      latestInfractions: [],
      currentVideoIndex: 0,
      intervalId: null,
    };
  }

  componentDidMount() {
    this.syncVideoState();
    this.setVideoInterval();
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  syncVideoState() {
    const savedVideoIndex = localStorage.getItem("currentVideoIndex");
    if (savedVideoIndex) {
      this.setState({ currentVideoIndex: parseInt(savedVideoIndex, 10) });
    }
  }

  setVideoInterval() {
    const intervalId = setInterval(() => {
      this.toggleVideo();
    }, 40000);
    this.setState({ intervalId });
  }

  toggleVideo() {
    const nextVideoIndex = (this.state.currentVideoIndex + 1) % videos.length;
    console.log(`Changing to video index: ${nextVideoIndex}`);
    const info = videoInfo[nextVideoIndex] || {
      plate: "Unknown",
      speed: "0 KM/H",
      type: "Unknown",
    };

    this.setState((prevState) => {
      const existingDetectionIndex = prevState.detections.findIndex(
        (d) => d.plate === info.plate
      );
      let updatedDetections = [...prevState.detections];

      if (existingDetectionIndex !== -1) {
        updatedDetections[existingDetectionIndex].infractions += 1;
      } else {
        updatedDetections.push({ plate: info.plate, infractions: 1 });
      }

      return {
        currentVideoIndex: nextVideoIndex,
        detections: updatedDetections,
        latestInfractions: [
          ...prevState.latestInfractions,
          { plate: info.plate, speed: info.speed, type: info.type },
        ],
      };
    });

    localStorage.setItem("currentVideoIndex", nextVideoIndex);
  }

  render() {
    const { theme } = this.props;
    const { detections, latestInfractions, currentVideoIndex } = this.state;

    return (
      <div className="education-main" style={{ backgroundColor: "#edf9fe" }}>
        <Header theme={this.props.theme} />
        <div className="basic-education">
          <Fade bottom duration={2000} distance="40px">
            <div className="heading-div">
              <div className="heading-video-div">
                <h1 className="heading-text" style={{ color: "#001c55" }}>
                  Latest Detection
                </h1>
                <VideoCard src={videos[currentVideoIndex]} theme={theme} />
              </div>
              <div className="heading-table-div">
                <h1 className="heading-text" style={{ color: "#001c55" }}>
                  Latest Infractions
                </h1>
                <CustomTable
                  data={latestInfractions}
                  columns={["Plate", "Speed", "Type"]}
                />
              </div>
              <div className="heading-table-div">
                <h1 className="heading-text" style={{ color: "#001c55" }}>
                  Top Infractions
                </h1>
                <CustomTable
                  data={detections}
                  columns={["Plate", "Infractions"]}
                />
              </div>
            </div>
          </Fade>
          <Educations theme={this.props.theme} />
        </div>
        <Footer theme={this.props.theme} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}

export default Education;

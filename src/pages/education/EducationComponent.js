import React, { Component } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import Educations from "../../containers/education/Educations";
import CustomTable from "../../components/customTable/customTable";
import VideoCard from "../../components/videoCard/VideoCard";
import "./EducationComponent.css";
import { Fade } from "react-reveal";
import videoRecuperado from "../../assets/images/video_recuperado.gif";

class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detections: [
        { plate: "ABC123", infractions: 10 },
        { plate: "XYZ789", infractions: 8 },
        { plate: "LMN456", infractions: 7 },
        { plate: "DEF321", infractions: 5 },
        { plate: "GHI654", infractions: 3 },
        { plate: "JKL987", infractions: 2 },
        { plate: "MNO654", infractions: 1 },
      ],
      latestInfractions: [
        { plate: "IRV 504", speed: "53.982 km/h", type: "🚗 Speed" },
      ],
    };
  }

  render() {
    const { theme } = this.props;
    const { detections, latestInfractions } = this.state;

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
                <VideoCard src={videoRecuperado} theme={theme} />
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

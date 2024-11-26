import React, { Component } from "react";
import "./DegreeCard.css";
import { Fade, Flip } from "react-reveal";

class DegreeCard extends Component {
  componentDidMount() {
    if (this.props.degree.eyes) {
      this.createEyes();
    }
  }

  componentWillUnmount() {
    if (this.props.degree.eyes) {
      window.removeEventListener("mousemove", this.handleMouseMove);
      window.removeEventListener("scroll", this.handleScroll);
    }
  }

  createEyes() {
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("scroll", this.handleScroll);
  }

  handleMouseMove = (event) => {
    const eyes = document.querySelectorAll(".eye");
    eyes.forEach((eye) => {
      const rect = eye.getBoundingClientRect();
      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + rect.height / 2;
      const angle = Math.atan2(event.clientY - eyeY, event.clientX - eyeX);
      const pupil = eye.querySelector(".pupil");
      const maxMove = 15; // Mayor desplazamiento para un efecto más extremo
      const pupilX = Math.cos(angle) * maxMove;
      const pupilY = Math.sin(angle) * maxMove;

      // Actualizar posición de la pupila
      pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;

      // Movimiento tembloroso aleatorio
      const shakeIntensity = Math.random() * 2 - 1; // Entre -1 y 1
      eye.style.transform = `rotate(${shakeIntensity}deg)`;
    });
  };

  handleScroll = () => {
    const eyes = document.querySelectorAll(".eye");
    const scrollY = window.scrollY;
    eyes.forEach((eye) => {
      const rect = eye.getBoundingClientRect();
      const eyeY = rect.top + rect.height / 2;
      const pupil = eye.querySelector(".pupil");
      const maxMove = 10;
      const pupilY = Math.min(
        Math.max((scrollY - eyeY) / 10, -maxMove),
        maxMove
      );

      const currentTransform = pupil.style.transform || "translate(0px, 0px)";
      const currentX =
        currentTransform.match(/translate\((-?\d+\.?\d*)px,/)?.[1] || 0;

      pupil.style.transform = `translate(${currentX}px, ${pupilY}px)`;
    });
  };

  render() {
    const degree = this.props.degree;
    const theme = this.props.theme;

    return (
      <div className="degree-card">
        {degree.logo_path && (
          <Flip left duration={2000}>
            <div className="card-img">
              <img
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  transform: "scale(0.9)",
                }}
                src={require(`../../assets/images/${degree.logo_path}`)}
                alt={degree.alt_name}
              />
            </div>
          </Flip>
        )}
        <Fade right duration={2000} distance="40px">
          <div
            className="card-body"
            style={{ width: degree.logo_path ? "90%" : "100%" }}
          >
            <div
              className="body-header"
              style={{ backgroundColor: theme.headerColor }}
            >
              <div className="body-header-title">
                <h2 className="card-title" style={{ color: theme.text }}>
                  {degree.title}
                </h2>
                <h3 className="card-subtitle" style={{ color: theme.text }}>
                  {degree.subtitle}
                </h3>
              </div>
              <div className="body-header-duration">
                <h3 className="duration" style={{ color: theme.text }}>
                  {degree.duration}
                </h3>
              </div>
            </div>
            <div className="body-content">
              {degree.descriptions.map((desc, index) => {
                if (typeof desc === "string") {
                  return (
                    <p
                      key={index}
                      className="content-list"
                      style={{ color: theme.text }}
                    >
                      {desc}
                    </p>
                  );
                } else if (desc.type === "image") {
                  return (
                    <img
                      key={index}
                      src={require(`../../assets/images/${desc.src}`)}
                      alt={desc.alt}
                      style={{
                        maxWidth: "100%",
                        marginTop: "10px",
                        borderRadius: "10px",
                      }}
                    />
                  );
                }
                return null;
              })}
              {degree.eyes && (
                <div className="eyes-container">
                  <div className="eye">
                    <div className="pupil"></div>
                  </div>
                  <div className="eye">
                    <div className="pupil"></div>
                  </div>
                </div>
              )}
              {degree.website_link && (
                <a
                  href={degree.website_link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="visit-btn"
                    style={{ backgroundColor: theme.headerColor }}
                  >
                    <p className="btn" style={{ color: theme.text }}>
                      Visit Website
                    </p>
                  </div>
                </a>
              )}
            </div>
          </div>
        </Fade>
      </div>
    );
  }
}

export default DegreeCard;

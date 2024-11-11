import React from "react";
import "./VideoCard.css";

export default function VideoCard({ src, poster, description, theme }) {
  return (
    <div className="video-card">
      <video className="video-content" autoPlay loop muted poster={poster}>
        <source src={src} type="video/mp4" />
      </video>
      <div className="video-description" style={{ color: theme.text }}>
        {description}
      </div>
    </div>
  );
}

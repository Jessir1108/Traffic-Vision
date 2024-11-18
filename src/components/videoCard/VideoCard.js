import React from "react";
import "./VideoCard.css";

export default function VideoCard({ src, poster }) {
  return (
    <div className="video-card">
      <video className="video-content" autoPlay loop muted poster={poster}>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

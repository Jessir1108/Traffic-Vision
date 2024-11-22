import React, { useState } from "react";
import "./VideoCard.css";

export default function VideoCard({ src }) {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  return (
    <div className="video-card">
      {error ? (
        <div className="error-message">Error loading GIF</div>
      ) : (
        <img
          className="video-content"
          src={src}
          alt="GIF content"
          onError={handleError}
        />
      )}
    </div>
  );
}

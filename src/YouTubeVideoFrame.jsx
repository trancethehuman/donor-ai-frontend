import React from "react";
import "./YouTubeVideoFrame.css";

const YouTubeVideoFrame = ({ videoID }) => {
  return (
    <div className="video-iframe-container">
      <iframe
        src={`https://www.youtube.com/embed/${videoID}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        className="video-iframe"
      />
    </div>
  );
};

export default YouTubeVideoFrame;

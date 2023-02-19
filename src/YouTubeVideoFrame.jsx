import React from "react";

const YouTubeVideoFrame = ({ videoID }) => {
  return (
    <div>
      <h1>My YouTube Video</h1>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoID}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default YouTubeVideoFrame;

import React, { useEffect, useRef } from "react";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";

const VideoPlayer = ({ videoId }) => {
  const ref = useRef();

  useEffect(() => {
    // Access the plyr instance and play the video
    if (ref.current && ref.current.plyr) {
      ref.current.plyr.play();
    }
  }, []);

  const options = {
    autoplay: true,
  };

  const videoSrc = {
    type: "video",
    sources: [
      {
        src: videoId,
        provider: "youtube",
      },
    ],
  };

  // const playerRef = useRef(null);
  // const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  // useEffect(() => {
  //   console.log(videoId, videoUrl);
  // }, []);

  return <Plyr source={videoSrc} ref={ref} options={options} />;
};

export default VideoPlayer;

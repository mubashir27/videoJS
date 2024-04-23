import React from "react";
import VideoJS from "./components/Video";
import videojs from "video.js";

const App = () => {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    responsive: true,
    loop: true,
    muted: true,
    height: "40px",
    width: "40px",
    sources: [
      {
        src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        type: "video/mp4",
      },
    ],
    skipButtons: true,
    controlBar: {
      skipButtons: {
        forward: 10,
        backward: 10,
      },
    },

    playbackRates: [0.5, 1, 1.5, 2],
    nativeControlsForTouch: true,
    userActions: {
      doubleClick: function (event) {
        const width = document.documentElement.clientWidth;
        // left
        const threshold = width / 3;
        if (event.clientX < threshold) {
          this.controlBar.skipBackward.handleClick_(10);
        }
        // right
        const rightThreshold = (2 * width) / 3;
        if (event.clientX >= rightThreshold) {
          this.controlBar.skipForward.handleClick_(10);
        }
      },
      hotkeys: function (event) {
        if (event.which === 32) {
          if (this.paused()) {
            this.play();
          } else {
            this.pause();
          }
        }
        // Right arrow key
        if (event.which === 39) {
          console.log("right", this);
          this.controlBar.skipForward.handleClick_(10);
        }

        // Left arrow key
        if (event.which === 37) {
          console.log("left");
          this.controlBar.skipBackward.handleClick_(10);
        }
      },
    },
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <>
      <div>Rest of app here</div>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      <div>Rest of app here</div>
    </>
  );
};

export default App;

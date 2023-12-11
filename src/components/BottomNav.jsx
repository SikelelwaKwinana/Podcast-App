
import React from "react";
import AudioPlayer from "./AudioPlayer";
import "../styles/navbar.css";


const BottomNavbar = ({ isPlaying, setIsPlaying, currentEpisode }) => {
  return (
    <div className="bottom-navbar">
      <AudioPlayer
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentEpisode={currentEpisode}
      />
    </div>
  );
};

export default BottomNavbar;

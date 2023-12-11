// AudioPlayer.js
import React, { useEffect, useRef, useState } from "react";

const AudioPlayer = ({ isPlaying, setIsPlaying, currentEpisode }) => {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (currentEpisode) {
      audioRef.current.src = currentEpisode.file;
      audioRef.current.play().catch((error) => {
        console.error('Error playing audio:', error.message);
      });
    }
  }, [currentEpisode]);

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleDurationChange = () => {
    setDuration(audioRef.current.duration);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.error('Error playing audio:', error.message);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value) => {
    audioRef.current.currentTime = value;
  };

  return (
    <div className="audio-player">
      {currentEpisode && (
        <div>
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onDurationChange={handleDurationChange}
            onEnded={() => setIsPlaying(false)}
          />
          <div>
            <p>{`Current Time: ${formatTime(currentTime)}`}</p>
            <p>{`Episode Length: ${formatTime(duration)}`}</p>
          </div>
          <div>
            <button onClick={handlePlayPause}>
              {isPlaying ? "Pause" : "Play"}
            </button>
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={(e) => handleSeek(e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

export default AudioPlayer;

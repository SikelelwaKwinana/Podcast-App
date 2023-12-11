import React, { createContext, useContext, useRef, useState } from 'react';

const AudioContext = createContext();

export const useAudioPlayer = () => {
  return useContext(AudioContext);
};

export const AudioPlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const audioRef = useRef(new Audio()); 

  const playPauseHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const setAudio = (episode) => {
    setCurrentEpisode(episode);
    audioRef.current = new Audio(episode.file); 
  };

  const closeHandler = () => {
    if (isPlaying) {
      const confirmation = window.confirm(
        'You have an active episode. Are you sure you want to leave the page?'
      );

      if (!confirmation) {
        return;
      }
    }

    setIsPlaying(false);
    setCurrentEpisode(null);
  };

  const value = {
    isPlaying,
    currentEpisode,
    playPauseHandler,
    setAudio,
    closeHandler,
    audioRef, 
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

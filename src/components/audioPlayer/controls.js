import React from 'react';
import "./controls.css";
import { IconContext } from 'react-icons';
import { IoPause, IoPlay, IoPlaySkipBack, IoPlaySkipForward } from 'react-icons/io5';

export default function Controls({
  isPlaying, 
  setIsPlaying, 
  handleNext, 
  handlePrev
}) {
  return ( 
  <IconContext.Provider value={{size: "35px", color: "#cbb89d"}}>
    <div className="controls-wrapper">
      <div className='action-btn' onClick={handlePrev}>
        <IoPlaySkipBack />
      </div>
      <div className="play-pause-btn" onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? <IoPause /> : <IoPlay />}
      </div>
      <div className='action-btn' onClick={handleNext}>
        <IoPlaySkipForward />
      </div>
    </div>;
  </IconContext.Provider>
  );
}

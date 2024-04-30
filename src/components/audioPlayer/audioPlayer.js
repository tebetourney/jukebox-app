import React, { useState, useRef, useEffect } from 'react';
import "./audioPlayer.css";
import ProgressCircle from './progressCircle';
import WaveAnimation from './waveAnimation';
import Controls from './controls';

export default function AudioPlayer({ currentTrack, currentIndex, setCurrentIndex, total }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [trackProgress, setTrackProgress] = useState(0);
  
  const audioRef = useRef(new Audio(total[currentIndex]?.track.preview_url)); 

  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;
  const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;

  intervalRef.current = setInterval(() => {
    if (audioRef.current.ended) {
      handleNext();
    } else {
      console.log("Current time:", audioRef.current.currentTime); 
      setTrackProgress(audioRef.current.currentTime); 
    }
  }, 1000);
  

  const startTimer = () => {
    clearInterval(intervalRef.current); 
    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        handleNext(); 
      } else {
        setTrackProgress(audioRef.current.currentTime); 
      }
    }, 1000); 
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch((err) => console.error("Play interrupted:", err)); 
      startTimer(); 
    } else {
      clearInterval(intervalRef.current); 
      audioRef.current.pause(); 
    }
  }, [isPlaying]); 

  useEffect(() => {
    audioRef.current.pause(); 
    audioRef.current.src = total[currentIndex]?.track.preview_url; 
    setTrackProgress(0); 

    if (isReady.current) {
      audioRef.current.play().catch((err) => console.error("Play interrupted:", err)); 
      setIsPlaying(true); 
      startTimer(); 
    } else {
      isReady.current = true; 
    }
  }, [currentIndex]); 

  useEffect(() => {
    return () => {
      audioRef.current.pause(); 
      clearInterval(intervalRef.current); 
    };
  }, []); 

  const handleNext = () => {
    if (currentIndex < total.length - 1) {
      setCurrentIndex(currentIndex + 1); 
    } else {
      setCurrentIndex(0); 
    }
  };

  const handlePrev = () => {
    if (currentIndex - 1 < 0) {
      setCurrentIndex(total.length - 1); 
    } else {
      setCurrentIndex(currentIndex - 1); 
    }
  };

  const addZero = (n) => {
    return n > 9 ? "" + n : "0" + n; 
  };

  const artists = currentTrack?.album?.artists.map((artist) => artist.name).join(" | ");

  return (
    <div className="player-body flex">
      <div className="player-left-body">
        <ProgressCircle 
          percentage={currentPercentage}
          isPlaying={isPlaying}
          image={currentTrack?.album?.images[0]?.url}
          size={300}
          color="#895d2b"
        />
      </div>
      <div className="player-right-body flex">
        <p className="song-title">{currentTrack?.name}</p>
        <p className='song-artist'>{artists}</p>
        <div className="player-right-bottom flex">
          <div className="song-duration flex">
            <p className="duration">0:{addZero(Math.round(trackProgress))}</p>
            <WaveAnimation isPlaying={isPlaying} />
            <p className="duration">0:30</p>
          </div>
          <Controls 
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import "./audioPlayer.css";
import ProgressCircle from './progressCircle';
import WaveAnimation from './waveAnimation';
import Controls from './controls';


export default function AudioPlayer({currentTrack, isPlaying}) {
    const artists = [];
    currentTrack?.album?.artists.forEach((artist) => {
        artists.push(artist.name);
    });
  
    return (
    <div className="player-body flex">
        <div className="player-left-body">
            <ProgressCircle 
                percentage = {75}
                isPlaying = {true}
                image = {currentTrack?.album?.images[0]?.url}
                size = {300}
                color = "#895d2b"
            />
        </div>
        <div className="player-right-body flex">
            <p className="song-title">{currentTrack?.name}</p>
            <p className='song-artist'>{artists.join(" | ")}</p>
            <div className="player-right-bottom flex">
                <div className="song-duration flex">
                    <p className="duration">0:01</p>
                    <WaveAnimation isPlaying={isPlaying} />
                    <p className="duration">0:30</p>
                </div>
                <Controls 
                /*    isPlaying={isPLaying}
                    setIsPlaying={setIsPlaying}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    total={total} */
                />
            </div>
        </div>
    </div>
  )
}

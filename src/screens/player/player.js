import React, { useEffect, useState } from 'react';
import "./player.css";
import { useLocation } from 'react-router-dom';
import apiClient from '../../spotify';
import Queue from '../../components/queue/queue';
import SongCard from '../../components/songCard/songCard';
import AudioPlayer from '../../components/audioPlayer/audioPlayer';

export default function Player() {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (location.state) {
      apiClient
        .get("playlists/" + location.state?.id + "/tracks")
        .then((res) => {
          const newTracks = res.data.items || []; // fixing null
          setTracks(newTracks);
          setCurrentTrack(newTracks[0]?.track || {}); // fixing null
        });
    }
  }, [location.state]);

  useEffect(() => {
    if (tracks.length > 0 && currentIndex < tracks.length) {
      setCurrentTrack(tracks[currentIndex]?.track || {}); // fixing null
    }
  }, [currentIndex, tracks]);

  return (
    <div className="screen-container flex">
      {tracks.length > 0 ? (
        <>
          <div className="left-player-body">
            <AudioPlayer
              currentTrack={currentTrack}
              total={tracks}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          </div>
          <div className="right-player-body">
            <SongCard album={currentTrack?.album} /> 
            <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
          </div>
        </>
      ) : (
        <div className="loading-message">Loading playlist...</div> 
      )}
    </div>
  );
}


import React, { useState, useRef, useEffect } from 'react';
import "./audioPlayer.css";
import ProgressCircle from './progressCircle';
import WaveAnimation from './waveAnimation';
import Controls from './controls';

// Doubly-linked list w/ circular behavior
class SongNode {
    constructor(track) {
      this.track = track;
      this.next = null;
      this.prev = null;
    }
  }
  
  class LinkedPlaylist {
    constructor() {
      this.head = null;
      this.tail = null;
    }
  
    addTrack(track) {
      const newNode = new SongNode(track);
  
      if (!this.head) {
        this.head = newNode;
        this.tail = newNode;
        this.head.next = this.tail;
        this.tail.prev = this.head;
        return;
      }
  
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
      this.tail.next = this.head;
      this.head.prev = this.tail;
    }
  
    getNext(current) {
        if (!current) {
          return this.head; // fixing null error
        }
        return current.next;
      }
  
      getPrev(current) {
        if (!current) {
          return this.tail; // fixing null error
        }
        return current.prev;
      }
  
    getCurrentTrack() {
      return this.head;
    }
  }

export default function AudioPlayer({ total }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [trackProgress, setTrackProgress] = useState(0);
  
    const playlist = new LinkedPlaylist();
    total.forEach(track => playlist.addTrack(track));
  
    const [currentTrackNode, setCurrentTrackNode] = useState(playlist.getCurrentTrack());
    const audioRef = useRef(new Audio(currentTrackNode.track?.preview_url));
  
    const intervalRef = useRef();
    const isReady = useRef(false);
  
    const duration = audioRef.current?.duration ?? 0;
    const currentPercentage = duration ? (trackProgress / duration) * 100 : 0;
  
    const startTimer = () => {
        if (!audioRef.current) {
            return; // fixing null error
          }
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
        if (isPlaying && audioRef.current) {
          audioRef.current.play().catch((err) => console.error("Play interrupted:", err));
          startTimer();
        } else {
          clearInterval(intervalRef.current);
          audioRef.current?.pause(); // fixing null error
        }
      }, [isPlaying]);
  
    useEffect(() => {
        if (!currentTrackNode || !audioRef.current) {
            return; // fixing null error
          }  
      audioRef.current.pause();
      audioRef.current.src = currentTrackNode.track?.preview_url;
      setTrackProgress(0);
  
      if (isReady.current) {
        audioRef.current.play().catch((err) => console.error("Play interrupted:", err));
        setIsPlaying(true);
        startTimer();
      } else {
        isReady.current = true;
      }
    }, [currentTrackNode]); 
  
    useEffect(() => {
      return () => {
        audioRef.current.pause();
        clearInterval(intervalRef.current);
      };
    }, []);
  
    const handleNext = () => {
      setCurrentTrackNode(playlist.getNext(currentTrackNode));
    };
  
    const handlePrev = () => {
      setCurrentTrackNode(playlist.getPrev(currentTrackNode));
    };
  
    const addZero = (n) => {
      return n > 9 ? "" + n : "0" + n;
    };
  
    const artists = currentTrackNode.track?.album?.artists.map((artist) => artist.name).join(" | ");
  
    return (
      <div className="player-body flex">
        <div className="player-left-body">
          <ProgressCircle 
            percentage={currentPercentage}
            isPlaying={isPlaying}
            image={currentTrackNode?.track?.album?.images[0]?.url}
            size={300}
            color="#895d2b"
          />
        </div>
        <div class="player-right-body flex">
          <p class="song-title">{currentTrackNode.track?.name}</p>
          <p class='song-artist'>{artists}</p>
          <div class="player-right-bottom flex">
            <div class="song-duration flex">
              <p class="duration">0:{addZero(Math.round(trackProgress))}</p>
              <WaveAnimation isPlaying={isPlaying} />
              <p class="duration">0:30</p>
            </div>
            <Controls 
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              handleNext={handleNext}
              handlePrev={handlePrev}
            />
          </div>
        </div>
      </div>
    );
  }
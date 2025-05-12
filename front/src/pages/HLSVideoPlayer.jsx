import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HlsPlayer from 'react-hls-player';
import { FaPlay, FaPause, FaClosedCaptioning, FaBackward, FaForward, FaArrowsAlt } from 'react-icons/fa';
import { IoLanguage } from 'react-icons/io5';

// Memoize the HlsPlayer component to prevent re-renders
const HlsPlayerWrapper = React.memo(({ src, playerRef }) => (
  <HlsPlayer
    src={src}
    autoPlay={false}
    controls={false}
    playerRef={playerRef}
    width="100%"
    height="100%"
    style={styles.video}
    hlsConfig={{
      autoStartLoad: true,
      maxBufferLength: 10,
      maxMaxBufferLength: 30,
      maxBufferSize: 50 * 1000 * 1000,
      bufferLow: 0.2,
      bufferHigh: 0.9,
      startLevel: -1,
      capLevelToPlayerSize: true,
      abrEwmaFastLive: 2.0,
      abrEwmaSlowLive: 6.0,
    }}
  />
));

const HLSVideoPlayer = ({
  src = "http://localhost:3000/hls/myvideo1/master.m3u8",
  videoId,
  onExit,
  playbackRate = 1.0,
  subtitles = [],
  goToPage = "/"
}) => {
  const playerRef = useRef(null);
  const inactivityTimeoutRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [showControls, setShowControls] = useState(true);
  const [captionsEnabled, setCaptionsEnabled] = useState(false);  // New state for captions
  const navigate = useNavigate();

  useEffect(() => {
    // Adding event listeners when the component mounts
    document.addEventListener('click', handleClickOrKeyPress);
    document.addEventListener('keydown', handleClickOrKeyPress);

    return () => {
      // Cleanup event listeners when the component unmounts
      document.removeEventListener('click', handleClickOrKeyPress);
      document.removeEventListener('keydown', handleClickOrKeyPress);
    };
  }, []);

  // Set playback rate
  useEffect(() => {
    const video = playerRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      video.playbackRate = playbackRate;
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    return () => video.removeEventListener('loadedmetadata', handleLoadedMetadata);
  }, [playbackRate]);

  // Track video progress
  useEffect(() => {
    const video = playerRef.current;
    const updateProgress = () => {
      const newProgress = (video.currentTime / video.duration) * 100;
      setProgress(prev => Math.abs(prev - newProgress) > 0.1 ? newProgress : prev);
    };
    if (video) {
      video.addEventListener('timeupdate', updateProgress);
    }
    return () => {
      if (video) {
        video.removeEventListener('timeupdate', updateProgress);
      }
    };
  }, []);

  // Track page unload
  useEffect(() => {
    const handleExit = () => {
      const data = JSON.stringify({ videoId, timestamp: new Date().toISOString() });
      navigator.sendBeacon('/api/track-exit', data);
      if (onExit) onExit();
    };

    window.addEventListener('unload', handleExit);
    return () => window.removeEventListener('unload', handleExit);
  }, [videoId, onExit]);

  // Toggle play/pause
  const togglePlay = () => {
    const video = playerRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  // Skip forward or backward
  const skip = (time) => {
    const video = playerRef.current;
    if (video) {
      video.currentTime += time;
    }
  };

  // Seek video from the progress bar
  const handleSeek = (e) => {
    const progressBar = e.target;
    const clickPosition = e.nativeEvent.offsetX;
    const progressBarWidth = progressBar.offsetWidth;
    const newTime = (clickPosition / progressBarWidth) * playerRef.current.duration;
    playerRef.current.currentTime = newTime;
  };

  // Toggle fullscreen
  const toggleFullScreen = () => {
    const video = playerRef.current;
    if (video.requestFullscreen) video.requestFullscreen();
    else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
    else if (video.msRequestFullscreen) video.msRequestFullscreen();
  };

  // Handle subtitle language change
  const changeSubtitleLanguage = (event) => {
    const language = event.target.value;
    setSelectedLanguage(language);
    const video = playerRef.current;
    if (video) {
      const textTracks = video.textTracks;
      for (let i = 0; i < textTracks.length; i++) {
        textTracks[i].mode = textTracks[i].language === language ? 'showing' : 'hidden';
      }
    }
  };

  // Toggle captions on/off
  const toggleCaptions = () => {
    const video = playerRef.current;
    if (video) {
      const textTracks = video.textTracks;
      for (let i = 0; i < textTracks.length; i++) {
        textTracks[i].mode = captionsEnabled ? 'hidden' : 'showing';
      }
    }
    setCaptionsEnabled(prev => !prev);
  };

  // Navigate to another page
  const handleArrowClick = () => {
    navigate(goToPage);
  };

  // Handle key controls
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      skip(-5);
    } else if (e.key === 'ArrowRight') {
      skip(5);
    }
  };

  // Handle play/pause with click or spacebar
  const handleClickOrKeyPress = (e) => {
    if ((e.type === 'click' || e.code === 'Space') && !e.target.closest('.button-container')) {
      togglePlay();
    }
  };

  // Auto-hide controls logic
  const resetInactivityTimer = () => {
    setShowControls(true);
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
    inactivityTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000); // 3 seconds
  };

  useEffect(() => {
    const handleUserActivity = () => resetInactivityTimer();

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('click', handleUserActivity);

    resetInactivityTimer(); // initial timer

    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div style={styles.container}>
      <HlsPlayerWrapper src={src} playerRef={playerRef} />

      {showControls && (
        <>
          {/* Progress Bar */}
          <div className="button-container" style={styles.progressBarContainer} onClick={handleSeek}>
            <div style={{ ...styles.progressBar, width: `${progress}%` }} />
          </div>

          {/* Controls */}
          <div style={styles.controls} className="button-container">
            <button style={styles.button} onClick={() => skip(-5)}><FaBackward /> -5s</button>
            <button style={styles.button} onClick={togglePlay}>
              {isPlaying ? <FaPause /> : <FaPlay />} 
            </button>
            <button style={styles.button} onClick={() => skip(5)}><FaForward /> +5s</button>
            <button style={styles.button} onClick={toggleFullScreen}><FaArrowsAlt /> </button>
            <button style={styles.button} onClick={toggleCaptions}>
              <FaClosedCaptioning /> Captions
            </button>
           
          </div>

          {/* Arrow Button */}
          <div style={styles.arrowContainer}>
            <button onClick={handleArrowClick} style={styles.arrowButton}>←</button>
          </div>
        </>
      )}
    </div>
  );
};

// 🎨 Custom styles
const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'black',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    outline: 'none',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  controls: {
    position: 'absolute',
    bottom: '60px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '15px',
    zIndex: 1000,
  },
  button: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    color: '#fff',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  select: {
    padding: '10px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    color: '#fff',
    cursor: 'pointer',
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: '20px',
    left: 0,
    height: '8px',
    width: '100%',
    backgroundColor: '#444',
    zIndex: 1002, // Increased zIndex to ensure it stays on top
    cursor: 'pointer',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#EB3678',
    transition: 'width 0.2s ease-in-out',
  },
  arrowContainer: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    zIndex: 1001,
  },

  arrowButton: {
    padding: '10px',
    border: 'none',
    borderRadius: '50%',
    fontSize: '20px',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default HLSVideoPlayer;

import React, { useEffect, useRef, useState } from 'react';
import HlsPlayer from 'react-hls-player';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
      setProgress((video.currentTime / video.duration) * 100);
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
    <div
      style={styles.container}
      onClick={handleClickOrKeyPress}
      tabIndex="0"
      onKeyDown={handleClickOrKeyPress}
    >
      <HlsPlayer
        src={src}
        autoPlay={false}
        controls={false}
        playerRef={playerRef}
        width="100%"
        height="100%"
        style={styles.video}
      />
      {showControls && (
        <>
          <div style={styles.controls} className="button-container">
            <button style={styles.button} onClick={() => skip(-5)}>⏪ -5s</button>
            <button style={styles.button} onClick={togglePlay}>
              {isPlaying ? '⏸ Pause' : '▶️ Play'}
            </button>
            <button style={styles.button} onClick={() => skip(5)}>⏩ +5s</button>
            <button style={styles.button} onClick={toggleFullScreen}>🖵 Fullscreen</button>
            <select
              style={styles.select}
              value={selectedLanguage}
              onChange={changeSubtitleLanguage}
            >
              <option value="">Select Subtitle Language</option>
              {subtitles.map((language, index) => (
                <option key={index} value={language}>{language}</option>
              ))}
            </select>
          </div>

          <div className="button-container" style={styles.progressBarContainer} onClick={handleSeek}>
            <div style={{ ...styles.progressBar, width: `${progress}%` }} />
          </div>

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
    backgroundColor: '#CB9DF0',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    color: '#fff',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
  },
  select: {
    padding: '10px',
    backgroundColor: '#CB9DF0',
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
    zIndex: 1000,
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
    backgroundColor: '#4F1787',
    border: 'none',
    borderRadius: '50%',
    fontSize: '20px',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default HLSVideoPlayer;

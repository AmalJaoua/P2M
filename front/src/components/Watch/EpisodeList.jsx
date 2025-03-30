import React, { useState } from "react";
import PlayerOverlay from "../Movies/PlayerOverlay";
import PlayerVideo from "../Movies/PlayerVideo";

const EpisodeList = ({ episodes }) => {
   const [showPlayer, setShowPlayer] = useState(false);
  return (
    <div className="episode-list-container">
      <div className="episode-grid">
        {episodes.map(episode => (
          <div key={episode.id} className="episode-card">
            <div 
              className="episode-thumbnail" 
              style={{ backgroundImage: `url(${episode.image})` }}
            >
              <div className="play-overlay">
                <img src="./images/misc/logo.png" alt="" onClick={() => setShowPlayer(true)} />
              </div>
            </div>
            <div className="episode-info">
              <h3 className="episode-title">{episode.title}</h3>
              <p className="episode-duration">{episode.duration}</p>
            </div>
          </div>
        ))}
         {showPlayer ? (
            <PlayerOverlay onClick={() => setShowPlayer(false)}>
              <PlayerVideo src="./videos/video.mp4" type="video/mp4" />
            </PlayerOverlay>
          ) : null}
      </div>
    </div>
  );
};

export default EpisodeList;
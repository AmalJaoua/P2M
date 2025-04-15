import React, { useState } from "react";
import PlayButton from "../Header/PlayButton";
import WishlistButton from '../Header/WishlistButton';
import PlayerOverlay from "../Movies/PlayerOverlay";
import PlayerVideo from "../Movies/PlayerVideo";
import LikeButton from "../Header/LikeButton";
import "./Watch.css";

const VideoMetaInfo = ({ title, year, duration, rating, genres, description }) => {
    const [showPlayer, setShowPlayer] = useState(false);
  return (
    <section className="video-meta-section">
      <div className="width-container-forced-pro">
        <h1 className="video-title">{title}</h1>
        <div className="action-buttons action-buttons-watch">
          <PlayButton onClick={() => setShowPlayer(true)}></PlayButton>
          <WishlistButton/>
          <LikeButton/>
          </div>
          {showPlayer ? (
            <PlayerOverlay onClick={() => setShowPlayer(false)}>
              <PlayerVideo src="./videos/video.mp4" type="video/mp4" />
            </PlayerOverlay>
          ) : null}
        
        <ul className="meta-info-list">
          <li className="rating-badge">{rating}</li>
          <li>{year}</li>
          <li>{duration}</li>
          <li className="genres">
            <ul>
              {genres.map((genre, index) => (
                <li key={index}><a href={`/genre/${genre.toLowerCase()}`}>{genre}</a></li>
              ))}
            </ul>
          </li>
        </ul>
        
        <div className="video-description">
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
};

export default VideoMetaInfo;
import React from 'react';
import EpisodeList from './EpisodeList';


const SeasonTabs = ({ seasons, activeTab, onTabChange }) => {
  return (
    <div className="season-tabs">
      <div className="tab-navigation">
        {Object.keys(seasons).map((season, index) => (
          <button
            key={season}
            className={`tab-button ${activeTab === `season${index + 1}` ? 'active' : ''}`}
            onClick={() => onTabChange(`season${index + 1}`)}
          >
            {season}
          </button>
        ))}
      </div>
      
      <div className="tab-content">
        {Object.entries(seasons).map(([season, episodes], index) => (
          <div 
            key={season}
            className={`tab-pane ${activeTab === `season${index + 1}` ? 'active' : ''}`}
          >
            <EpisodeList episodes={episodes} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonTabs;
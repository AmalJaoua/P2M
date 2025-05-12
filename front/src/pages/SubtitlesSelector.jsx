import React from 'react';
import { FaClosedCaptioning } from 'react-icons/fa';

const SubtitleSelector = ({ subtitles, selectedLanguage, changeSubtitleLanguage }) => {
  return (
    <div>
      <button
        style={{ display: 'flex', alignItems: 'center', background: 'transparent', border: 'none' }}
        onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
      >
        <FaClosedCaptioning style={{ marginRight: '8px' }} />
        {selectedLanguage || 'Subtitles'}
      </button>
      
      <select
        style={{ display: 'inline-block', marginLeft: '10px' }}
        value={selectedLanguage}
        onChange={changeSubtitleLanguage}
      >
        <option value="">Select Language</option>
        {subtitles.map((language, index) => (
          <option key={index} value={language}>{language}</option>
        ))}
      </select>
    </div>
  );
};

export default SubtitleSelector;
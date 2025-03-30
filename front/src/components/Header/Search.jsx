// SearchComponent.jsx
import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import './Search.css';

const SearchC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 658);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 658);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      // Focus the input when opening
      setTimeout(() => document.querySelector('.search-field')?.focus(), 0);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Handle backend logic here
  };

  return (
    <div className="search-container">
      {isMobile ? (
        <>
          <button
            className="search-icon-button"
            onClick={handleSearchToggle}
            aria-label={isSearchOpen ? 'Close search' : 'Open search'}
          >
            {isSearchOpen ? (
              <X className="search-icon-mobile" size={20} />
            ) : (
              <Search className="search-icon-mobile" size={20} />
            )}
          </button>

          {isSearchOpen && (
            <div className="search-panel">
              <form className="search-form" onSubmit={handleSearchSubmit}>
                <input
                  type="search"
                  className="search-field"
                  placeholder="Search "
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  name="search_keyword"
                  autoFocus
                />
                <button type="submit" className="search-submit">
                  <Search size={16} />
                </button>
              </form>
            </div>
          )}
        </>
      ) : (
        <div className="search-group">
          <input
            placeholder="Search"
            type="search"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="search-icon" />
        </div>
      )}
    </div>
  );
};

export default SearchC;
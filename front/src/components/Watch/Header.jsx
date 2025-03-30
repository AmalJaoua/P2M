import React from 'react';
import Logo from '../Header/Logo';
import { CircleUserRound,Film, Tv  } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SearchC from '../Header/Search';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header-container">
      <div className="header-content">
        <div className="logo-container">
          <Logo/>
        </div>
        <nav className="main-navigation">
        <ul>
      <li className='category'>
        <a onClick={() => navigate("/browse", { state: { category: "films" } })}>
          <Film /> Movies
        </a>
      </li>
      <li className='category'>
        <a onClick={() => navigate("/browse", { state: { category: "series" } })}>
          <Tv /> Series
        </a>
      </li>
    </ul>
        </nav>
        <div className="header-actions">
          <div className="search-group">
            <SearchC/>
          </div>
          <div className="user-profile">
            <CircleUserRound className="profile-avatar" />
            <span className="username">John</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
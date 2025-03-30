import React from 'react';

const HeroSection = ({ backgroundImage }) => {
  return (
    <section 
      className="hero-section" 
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-gradient-overlay"></div>
    </section>
  );
};

export default HeroSection;
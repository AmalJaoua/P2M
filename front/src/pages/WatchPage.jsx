import React, { useState } from 'react';
import Header from '../components/Watch/Header';
import HeroSection from '../components/Watch/HeroSection';
import VideoMetaInfo from '../components/Watch/VideoMetaInfo';
import SeasonTabs from '../components/Watch/SeasonTabs';
import FooterCompound from "../compounds/FooterCompound";
import '../components/Watch/Watch.css';

const WatchPage = () => {
  const [activeTab, setActiveTab] = useState('season1');
  
  // Mock data would be replaced with API calls in a real app
  const videoData = {
    title: "Blind Origin",
    year: "2021",
    duration: "1 hr 43 min",
    rating: "TV-MA",
    genres: ["Sci-fi"],
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    backgroundImage: "https://aztec.progressionstudios.com/wp-content/uploads/2021/08/sandro-katalina-k1bO_VTiZSs-unsplash-1400x800.jpg",
    thumbnail: "https://aztec.progressionstudios.com/wp-content/uploads/2021/08/thumbnail.jpg",
    videoUrl: "https://aztec.progressionstudios.com/wp-content/uploads/2021/08/video.mp4",
    reviews: [
      {
        id: 14,
        author: "John Doe",
        date: "March 19, 2024",
        rating: 5,
        content: "Deneme",
        avatar: "//aztec.progressionstudios.com/wp-content/uploads/armember/arm_Cz6cfIkDN6_armFileCRlsX_agent1.jpg"
      }
    ],
    seasons: {
      "Season 1": [
        { id: 681, title: "1. Mountain Boarding", duration: "24 mins", image: "https://aztec.progressionstudios.com/wp-content/uploads/2021/08/felipe-giacometti-sawa7hivsRs-unsplash-2-700x880.jpg" },
        { id: 683, title: "2. Rising Sea", duration: "28 mins", image: "https://aztec.progressionstudios.com/wp-content/uploads/2021/08/roberto-h-qToVxSYXPYU-unsplash-700x880.jpg" },
        { id: 685, title: "3. City Escape", duration: "28 mins", image: "https://aztec.progressionstudios.com/wp-content/uploads/2021/08/abigail-keenan-RaVcslj475Y-unsplash-700x880.jpg" },
        { id: 687, title: "4. From Space", duration: "28 mins", image: "https://aztec.progressionstudios.com/wp-content/uploads/2021/08/nasa-yZygONrUBe8-unsplash-700x880.jpg" },
        { id: 670, title: "5. Frozen Wild", duration: "24 mins", image: "https://aztec.progressionstudios.com/wp-content/uploads/2021/08/manuel-venturini-38cyDa5x7qU-unsplash-700x880.jpg" },
        { id: 673, title: "6. Mountain Escape", duration: "22 mins", image: "https://aztec.progressionstudios.com/wp-content/uploads/2021/08/kurt-cotoaga-cqbLg3lZEpk-unsplash-700x880.jpg" }
      ],
      "Season 2": [
        { id: 654, title: "1. Stuck in the middle", duration: "30 mins", image: "https://aztec.progressionstudios.com/wp-content/uploads/2021/08/justin-lane-fzsJesR92jE-unsplash-700x880.jpg" },
        { id: 656, title: "2. Breaking Impacts", duration: "22 mins", image: "https://aztec.progressionstudios.com/wp-content/uploads/2021/08/kalle-kortelainen-X6xznf7JuWw-unsplash-700x880.jpg" },
        { id: 660, title: "3. Mountain Rain", duration: "20 mins", image: "https://aztec.progressionstudios.com/wp-content/uploads/2021/08/dan-meyers-aGLFozyvXsQ-unsplash-700x880.jpg" },
        { id: 667, title: "4. Traffic Overview", duration: "28 mins", image: "https://aztec.progressionstudios.com/wp-content/uploads/2021/08/vilen-sharifov-ImKKE3jB_JI-unsplash-700x880.jpg" },
        { id: 670, title: "5. Frozen Wild", duration: "24 mins", image: "https://aztec.progressionstudios.com/wp-content/uploads/2021/08/manuel-venturini-38cyDa5x7qU-unsplash-700x880.jpg" },
        { id: 673, title: "6. Mountain Escape", duration: "22 mins", image: "https://aztec.progressionstudios.com/wp-content/uploads/2021/08/kurt-cotoaga-cqbLg3lZEpk-unsplash-700x880.jpg" },
        { id: 676, title: "7. Garden of Eden", duration: "", image: "https://aztec.progressionstudios.com/wp-content/uploads/2021/08/isaac-martin-Apkr4nfK1mU-unsplash-700x880.jpg" },
        { id: 679, title: "8. Final Episode", duration: "22 mins", image: "https://aztec.progressionstudios.com/wp-content/uploads/2021/08/jared-rice-ujNuUPN12z0-unsplash-700x880.jpg" }
      ],
      "Season 3": [
        { id: 689, title: "1. The Long Road", duration: "24 mins", image: "https://aztec.progressionstudios.com/wp-content/uploads/2021/08/paul-gilmore-oc-PqSYz7UU-unsplash-700x880.jpg" },
        { id: 691, title: "2. Looking Above", duration: "28 mins", image: "https://aztec.progressionstudios.com/wp-content/uploads/2021/08/benjamin-davies-JrZ1yE1PjQ0-unsplash-700x880.jpg" },
        { id: 693, title: "3. Surf's Up", duration: "32 mins", image: "https://aztec.progressionstudios.com/wp-content/uploads/2021/08/guille-pozzi-2xkAA5Ez_oU-unsplash-700x880.jpg" },
        { id: 695, title: "4. Elephants Travel", duration: "22 mins", image: "https://aztec.progressionstudios.com/wp-content/uploads/2021/08/aj-robbie-BuQ1RZckYW4-unsplash-700x880.jpg" }
      ]
    }
  };

  return (
    <>
      <Header />
      <HeroSection 
        backgroundImage={videoData.backgroundImage}
        thumbnail={videoData.thumbnail}
        videoUrl={videoData.videoUrl}
      />
     <VideoMetaInfo 
        title={videoData.title}
        year={videoData.year}
        duration={videoData.duration}
        rating={videoData.rating}
        genres={videoData.genres}
        description={videoData.description}
    />
      <SeasonTabs 
        seasons={videoData.seasons} 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    <FooterCompound />
    </>
  );
};

export default WatchPage;
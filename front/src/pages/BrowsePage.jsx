import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { series as seriesData, films as filmsData } from "../seeder1";
import Header from "../components/Watch/Header";
import HeroSection from "../components/Watch/HeroSection";
import PlayButton from "../components/Header/PlayButton";
import AllSlidesWrapper from "../components/Movies/AllSlidesWrapper";
import SlideWrapper from "../components/Movies/SlideWrapper";
import SlideTitle from "../components/Movies/SlideTitle";
import AllCardsWrapper from "../components/Movies/AllCardsWrapper";
import CardWrapper from "../components/Movies/CardWrapper";
import CardImage from "../components/Movies/CardImage";
import CardTitle from "../components/Movies/CardTitle";
import CardDescription from "../components/Movies/CardDescription";
import CardFeatureWrapper from "../components/Movies/CardFeatureWrapper";
import CardFeatureClose from "../components/Movies/CardFeatureClose";
import PlayerVideo from "../components/Movies/PlayerVideo";
import PlayerOverlay from "../components/Movies/PlayerOverlay";
import FooterCompound from "../compounds/FooterCompound";
import WishlistButton from "../components/Header/WishlistButton";
import VideoMetaInfo from "../components/Watch/VideoMetaInfo";
import HeartButton from '../components/Header/HeartButton';
function BrowsePage() {
  let series = [
    { title: "Documentaries", data: seriesData.filter((item) => item.genre === "documentaries") },
    { title: "Comedies", data: seriesData.filter((item) => item.genre === "comedies") },
    { title: "Children", data: seriesData.filter((item) => item.genre === "children") },
    { title: "Crime", data: seriesData.filter((item) => item.genre === "crime") },
    { title: "Feel-Good", data: seriesData.filter((item) => item.genre === "feel-good") },
  ];

  let films = [
    { title: "Drama", data: filmsData.filter((item) => item.genre === "drama") },
    { title: "Thriller", data: filmsData.filter((item) => item.genre === "thriller") },
    { title: "Children", data: filmsData.filter((item) => item.genre === "children") },
    { title: "Suspense", data: filmsData.filter((item) => item.genre === "suspense") },
    { title: "Romance", data: filmsData.filter((item) => item.genre === "romance") },
  ];
  const location = useLocation();
  const initialCategory = location.state?.category || "films";
  const [category, setCategory] = useState(initialCategory);
  const currentCategory = category === "films" ? films : series;
  const [showCardFeature, setShowCardFeature] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const videoData = {title: "Blind Origin",
    year: "2021",
    duration: "1 hr 43 min",
    rating: "TV-MA",
    genres: ["Sci-fi"],
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    backgroundImage: "https://aztec.progressionstudios.com/wp-content/uploads/2021/08/sandro-katalina-k1bO_VTiZSs-unsplash-1400x800.jpg",
    thumbnail: "https://aztec.progressionstudios.com/wp-content/uploads/2021/08/thumbnail.jpg",
    videoUrl: "https://aztec.progressionstudios.com/wp-content/uploads/2021/08/video.mp4",}
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
      <AllSlidesWrapper>
        {currentCategory.map((slideItem) => (
          <SlideWrapper key={`${category}-${slideItem.title.toLowerCase()}`}>
            <SlideTitle>{slideItem.title}</SlideTitle>
            <AllCardsWrapper>
              {slideItem.data.map((cardItem) => (
                <CardWrapper key={cardItem.docId}>
                  <CardImage
                    onClick={() => {
                      setShowCardFeature(true);
                      setActiveItem(cardItem);
                    }}
                    src={`../images/${category}/${cardItem.genre}/${cardItem.slug}/small.jpg`}
                  />
                </CardWrapper>
              ))}
            </AllCardsWrapper>
            {showCardFeature && activeItem && slideItem.title.toLowerCase() === activeItem.genre ? (
              <CardFeatureWrapper
                style={{
                  backgroundImage: `url(../images/${category}/${activeItem.genre}/${activeItem.slug}/large.jpg)`,
                }}
              >
                <CardTitle>{activeItem.title}</CardTitle>
                <CardDescription>{activeItem.description}</CardDescription>
                <CardFeatureClose onClick={() => setShowCardFeature(false)} />
                <div className="action-buttons">
                  <PlayButton onClick={() => setShowPlayer(true)}></PlayButton>
                  <WishlistButton/>
                  <HeartButton />
                </div>
                {showPlayer ? (
                  <PlayerOverlay onClick={() => setShowPlayer(false)}>
                    <PlayerVideo src="../videos/video.mp4" type="video/mp4" />
                  </PlayerOverlay>
                ) : null}
              </CardFeatureWrapper>
            ) : null}
          </SlideWrapper>
        ))}
      </AllSlidesWrapper>
      <FooterCompound />
    </>
  );
}

export default BrowsePage;

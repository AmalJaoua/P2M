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
import HeartButton from "../components/Header/HeartButton";

// Responsive width hook
const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
};

function BrowsePage() {
  const location = useLocation();
  const initialCategory = location.state?.category || "films";
  const [category, setCategory] = useState(initialCategory);
  const width = useWindowWidth();
  const isSmallScreen = width <= 640;

  const [showCardFeature, setShowCardFeature] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);

  const videoData = {
    title: "Blind Origin",
    year: "2021",
    duration: "1 hr 43 min",
    rating: "TV-MA",
    genres: ["Sci-fi"],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    backgroundImage:
      "https://aztec.progressionstudios.com/wp-content/uploads/2021/08/sandro-katalina-k1bO_VTiZSs-unsplash-1400x800.jpg",
    thumbnail:
      "https://aztec.progressionstudios.com/wp-content/uploads/2021/08/thumbnail.jpg",
    videoUrl:
      "https://aztec.progressionstudios.com/wp-content/uploads/2021/08/video.mp4",
  };

  const series = [
    {
      title: "Documentaries",
      data: seriesData.filter((item) => item.genre === "documentaries"),
    },
    {
      title: "Comedies",
      data: seriesData.filter((item) => item.genre === "comedies"),
    },
    {
      title: "Children",
      data: seriesData.filter((item) => item.genre === "children"),
    },
    {
      title: "Crime",
      data: seriesData.filter((item) => item.genre === "crime"),
    },
    {
      title: "Feel-Good",
      data: seriesData.filter((item) => item.genre === "feel-good"),
    },
  ];

  const films = [
    { title: "Drama", data: filmsData.filter((item) => item.genre === "drama") },
    {
      title: "Thriller",
      data: filmsData.filter((item) => item.genre === "thriller"),
    },
    {
      title: "Children",
      data: filmsData.filter((item) => item.genre === "children"),
    },
    {
      title: "Suspense",
      data: filmsData.filter((item) => item.genre === "suspense"),
    },
    {
      title: "Romance",
      data: filmsData.filter((item) => item.genre === "romance"),
    },
  ];

  const currentCategory = category === "films" ? films : series;

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
              {(() => {
                const rows = [];
                const items = slideItem.data;
                const chunkSize = isSmallScreen ? 1 : 5;

                for (let i = 0; i < items.length; i += chunkSize) {
                  const chunk = items.slice(i, i + chunkSize);
                  rows.push(
                    <React.Fragment key={`row-${i}`}>
                      <div
                        className="card-row"
                        style={{
                          display: "flex",
                          flexDirection: isSmallScreen ? "column" : "row",
                          gap: "1rem",
                          justifyContent: "center",
                          marginBottom: "2rem",
                        }}
                      >
                        {chunk.map((cardItem) => (
                          <div
                            key={cardItem.docId}
                            style={{
                              flex: isSmallScreen
                                ? "1 1 100%"
                                : "1 1 calc(20% - 1rem)",
                              maxWidth: isSmallScreen
                                ? "100%"
                                : "calc(20% - 1rem)",
                            }}
                          >
                            <CardWrapper>
                              <CardImage
                                onClick={() => {
                                  setShowCardFeature(true);
                                  setActiveItem({
                                    ...cardItem,
                                    category: category,
                                  });
                                }}
                                src={`../images/${category}/${cardItem.genre}/${cardItem.slug}/small.jpg`}
                              />
                            </CardWrapper>
                          </div>
                        ))}
                      </div>

                      {showCardFeature &&
                        activeItem &&
                        chunk.some(
                          (item) =>
                            item.docId === activeItem.docId &&
                            activeItem.genre === item.genre
                        ) && (
                          <div
                            className="feature-row"
                            style={{
                              width: "100%",
                              marginBottom: "2rem",
                            }}
                          >
                            <CardFeatureWrapper
                              style={{
                                backgroundImage: `url(../images/${category}/${activeItem.genre}/${activeItem.slug}/large.jpg)`,
                                width: "100%",
                              }}
                            >
                              <CardTitle>{activeItem.title}</CardTitle>
                              <CardDescription style={{ display: "block", marginTop: "1rem" }}>
                                {activeItem.description}
                              </CardDescription>
                              <CardFeatureClose
                                onClick={() => setShowCardFeature(false)}
                              />
                              <div className="action-buttons" style={{ marginTop: "1rem" }}>
                                <PlayButton onClick={() => setShowPlayer(true)} />
                                <WishlistButton />
                                <HeartButton />
                              </div>
                              {showPlayer && (
                                <PlayerOverlay onClick={() => setShowPlayer(false)}>
                                  <PlayerVideo
                                    src="../videos/video.mp4"
                                    type="video/mp4"
                                  />
                                </PlayerOverlay>
                              )}
                            </CardFeatureWrapper>
                          </div>
                        )}
                    </React.Fragment>
                  );
                }

                return rows;
              })()}
            </AllCardsWrapper>
          </SlideWrapper>
        ))}
      </AllSlidesWrapper>
      <FooterCompound />
    </>
  );
}

export default BrowsePage;

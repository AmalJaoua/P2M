import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { series as seriesData, films as filmsData } from '../seeder1';
import Header from '../components/Watch/Header';
import AllSlidesWrapper from '../components/Movies/AllSlidesWrapper';
import SlideWrapper from '../components/Movies/SlideWrapper';
import SlideTitle from '../components/Movies/SlideTitle';
import AllCardsWrapper from '../components/Movies/AllCardsWrapper';
import CardWrapper from '../components/Movies/CardWrapper';
import CardImage from '../components/Movies/CardImage';
import CardTitle from '../components/Movies/CardTitle';
import CardDescription from '../components/Movies/CardDescription';
import CardFeatureWrapper from '../components/Movies/CardFeatureWrapper';
import CardFeatureClose from '../components/Movies/CardFeatureClose';
import PlayerVideo from '../components/Movies/PlayerVideo';
import PlayerOverlay from '../components/Movies/PlayerOverlay';
import FooterCompound from '../compounds/FooterCompound';
import PlayButton from '../components/Header/PlayButton';
import WishlistButton from '../components/Header/WishlistButton';
import HeartButton from '../components/Header/HeartButton';

// Responsive width hook
const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query')?.toLowerCase() || '';

  const [showCardFeature, setShowCardFeature] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [showPlayer, setShowPlayer] = useState(false);

  const width = useWindowWidth();
  const isSmallScreen = width <= 640;

  const matchingFilms = useMemo(
    () => filmsData.filter((item) => item.title.toLowerCase().includes(searchQuery)),
    [searchQuery]
  );
  const matchingSeries = useMemo(
    () => seriesData.filter((item) => item.title.toLowerCase().includes(searchQuery)),
    [searchQuery]
  );

  const categorizedResults = [
    { title: 'Matching Films', data: matchingFilms, category: 'films' },
    { title: 'Matching Series', data: matchingSeries, category: 'series' },
  ].filter((section) => section.data.length > 0);

  return (
    <>
      <Header />
      <div style={{ padding: '2rem' }}>
        <h2>These are results for: <em>"{searchQuery}"</em></h2>
      </div>

      <AllSlidesWrapper>
        {categorizedResults.map((slideItem) => (
          <SlideWrapper key={slideItem.title}
          style={{width: '100%'}}>
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
                          display: 'flex',
                          flexDirection: isSmallScreen ? 'column' : 'row',
                          gap: '1rem',
                          justifyContent: 'center',
                          marginBottom: '2rem',
                        }}
                      >
                        {chunk.map((cardItem) => (
                          <div
                            key={cardItem.docId}
                          >
                            <CardWrapper>
                              <CardImage
                                onClick={() => {
                                  setShowCardFeature(true);
                                  setActiveItem({ ...cardItem, category: slideItem.category });
                                }}
                                src={`../images/${slideItem.category}/${cardItem.genre}/${cardItem.slug}/small.jpg`}
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
                            activeItem.category === slideItem.category
                        ) && (
                          <div
                            className="feature-row"
                            style={{
                              width: '100%',
                              marginBottom: '2rem',
                            }}
                          >
                            <CardFeatureWrapper
                              style={{
                                backgroundImage: `url(../images/${activeItem.category}/${activeItem.genre}/${activeItem.slug}/large.jpg)`,
                                width: '100%',
                              }}
                            >
                              <CardTitle>{activeItem.title}</CardTitle>
                              <CardDescription style={{ display: 'block', marginTop: '1rem' }}>
                                {activeItem.description}
                              </CardDescription>
                              <CardFeatureClose onClick={() => setShowCardFeature(false)} />
                              <div className="action-buttons" style={{ marginTop: '1rem' }}>
                                <PlayButton onClick={() => setShowPlayer(true)} />
                                <WishlistButton />
                                <HeartButton />
                              </div>
                              {showPlayer && (
                                <PlayerOverlay onClick={() => setShowPlayer(false)}>
                                  <PlayerVideo src="../videos/video.mp4" type="video/mp4" />
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
};

export default SearchResults;

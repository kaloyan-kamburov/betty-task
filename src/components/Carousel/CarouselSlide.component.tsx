import React, { FC, useState } from "react";
import { CarouselSlideProps } from "./Carousel.types";

const CarouselSlide: FC<CarouselSlideProps> = ({
  imgUrl,
  page = 0,
  currentPage = 0,
  onImgLoaded,
  cachedImages,
  loadExplicit = false,
  width,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [errorOccured, setErrorOccured] = useState<boolean>(false);
  const [imgRendered, setImgRendered] = useState<boolean>(true);

  const onLoad = (_e: React.SyntheticEvent<HTMLImageElement>) => {
    setLoading(false);
    setErrorOccured(false);
    onImgLoaded(page);
  };

  const onLoadingStart = () => {
    setLoading(true);
  };

  const onError = () => {
    setErrorOccured(true);
    setLoading(false);
  };

  const retryLoadImage = () => {
    setErrorOccured(false);
    setImgRendered(false);
    setLoading(true);
    setTimeout(() => {
      setImgRendered(true);
    });
  };

  return (
    <div
      className="carousel-slide"
      style={{
        width,
      }}
    >
      {/* show loader before image is loaded */}
      {loading && <div className="loader" data-testid="loader" />}

      {!errorOccured ? (
        (page === currentPage - 1 || loadExplicit || cachedImages[page]) &&
        imgRendered && (
          <img
            className={`${loading && !cachedImages[page] ? "loading" : ""}`}
            src={
              page === currentPage - 1 || loadExplicit || cachedImages[page] ? imgUrl : ""
            }
            onLoadStart={onLoadingStart}
            onLoad={onLoad}
            onError={onError}
            alt={`Page ${page}`}
          />
        )
      ) : (
        // show error message and retry button
        <div className="error">
          <span>An error occured</span>
          <button onClick={retryLoadImage}>Retry</button>
        </div>
      )}
    </div>
  );
};

export default CarouselSlide;

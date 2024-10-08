/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from "react";
import { CarouselSlideProps } from "./Carousel.types";

const CarouselSlide: FC<CarouselSlideProps> = ({
  imgUrl,
  page = 0,
  currentPage = 0,
  onImgLoaded,
  cachedImages,
  loadExplicit = false,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [errorOccured, setErrorOccured] = useState<boolean>(false);
  const [imgRendered, setImgRendered] = useState<boolean>(true);

  // const getImage = async () => {
  //   if (cachedImages[page]) {
  //     setImg(cachedImages[page]);
  //     setLoading(false);
  //     return;
  //   }
  //   try {
  //     setLoading(true);
  //     const response = await fetch(imgUrl);
  //     const blob = await response.blob();
  //     const url = URL.createObjectURL(blob);
  //     // console.log(url);
  //     setImg(url);
  //     setLoading(false);
  //     onImgLoaded(page, url);
  //     console.log(page);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const onLoadingStart = () => {
  //   setLoading(true);
  // };

  const onLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    console.log((e.target as HTMLImageElement).naturalWidth);
    console.log((e.target as HTMLImageElement).naturalHeight);

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
    <div className="carousel-slide">
      {loading && <div className="loader" />}
      {!errorOccured ? (
        (page === currentPage - 1 || loadExplicit || cachedImages[page]) &&
        imgRendered && (
          <img
            className={`${loading && !cachedImages[page] ? "loading" : ""}`}
            src={imgUrl}
            onLoadStart={onLoadingStart}
            onLoad={onLoad}
            onError={onError}
            alt={`Page ${page}`}
          />
        )
      ) : (
        <div className="error">
          <span>An error occured</span>
          <button onClick={retryLoadImage}>Retry</button>
        </div>
      )}
    </div>
  );
};

export default CarouselSlide;

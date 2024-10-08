/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useState, useEffect } from "react";
import { CarouselSlideProps } from "./Carousel.types";

const CarouselSlide: FC<CarouselSlideProps> = ({
  imgUrl,
  page = 0,
  currentPage = 0,
  onImgLoaded,
  cachedImages,
  loadExplicit = false,
  transitionInProgress = false,
  changeSize,
  flexible = false,
  slidesLength,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [errorOccured, setErrorOccured] = useState<boolean>(false);
  const [imgRendered, setImgRendered] = useState<boolean>(true);
  const [dimenisons, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>();

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
    // console.log("yes");
    // console.log((e.target as HTMLImageElement).naturalWidth);
    // console.log((e.target as HTMLImageElement).naturalHeight);

    console.log("asss");
    console.log((e.target as HTMLImageElement).naturalWidth);

    // changeSize?.(
    //   (e.target as HTMLImageElement).naturalWidth,
    //   (e.target as HTMLImageElement).naturalHeight
    // );

    setDimensions({
      width: (e.target as HTMLImageElement).naturalWidth,
      height: (e.target as HTMLImageElement).naturalHeight,
    });

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

  useEffect(() => {
    if (
      flexible &&
      dimenisons &&
      (page === currentPage - 1 || currentPage === slidesLength)
    ) {
      setTimeout(() => {
        changeSize?.(dimenisons.width, dimenisons.height);
      }, 500);
    }
  }, [transitionInProgress, dimenisons, currentPage]);

  return (
    <div className="carousel-slide">
      {loading && <div className="loader" />}
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
        <div className="error">
          <span>An error occured</span>
          <button onClick={retryLoadImage}>Retry</button>
        </div>
      )}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: "#fff",
          zIndex: 20,
          borderRadius: "50%",
        }}
      >
        {page}
      </div>
    </div>
  );
};

export default CarouselSlide;

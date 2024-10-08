/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from "react";
import { CarouselSlideProps } from "./Carousel.types";

// const wait = (t: number) => new Promise((resolve, reject) => setTimeout(resolve, t));
const CarouselSlide: FC<CarouselSlideProps> = ({
  imgUrl,
  page = 0,
  currentPage = 0,
  onImgLoaded,
  cachedImages,
  loadExplicit = false,
}) => {
  // const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [img, setImg] = useState<string>("");

  const getImage = async () => {
    if (cachedImages[page]) {
      setImg(cachedImages[page]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      // console.log(url);
      setImg(url);
      setLoading(false);
      onImgLoaded(page, url);
      console.log(page);
    } catch (e) {
      console.log(e);
    }
  };

  // const onLoadingStart = () => {
  //   setLoading(true);
  // };

  // const onLoad = () => {
  //   // console.log(e);
  //   setLoading(false);
  //   onImgLoaded(page);
  // };

  // const onError = (e) => {
  //   console.log(e);
  // };

  useEffect(() => {
    if (loadExplicit || (currentPage - 1 === page && !cachedImages[page])) {
      // console.log("here");
      // console.log(page);
      getImage();
    }
  }, [currentPage, page]);

  return (
    <div className="carousel-slide">
      {/* {page === currentPage - 1 && ( 
      <img
        className={`${loading && !cachedImages[page] ? "loading" : ""}`}
        src={page === currentPage - 1 ? imgUrl : ""}
        onLoadStart={onLoadingStart}
        onLoad={onLoad}
        onError={onError}
        alt={`Page ${page}`}
      />
       )} */}

      {loading ? (
        <div>Loading...</div>
      ) : img ? (
        <img
          src={img}
          alt={`Page ${page}`}
          onLoad={() => {
            // console.log("loaded");
          }}
        />
      ) : null}
    </div>
  );
};

export default CarouselSlide;

/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from "react";
import { CarouselSlideProps } from "./Carousel.types";

// const wait = (t: number) => new Promise((resolve, reject) => setTimeout(resolve, t));
const CarouselSlide: FC<CarouselSlideProps> = ({ imgUrl, page, currentPage }) => {
  // const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  // const [img, setImg] = useState<string>("");

  // const getImage = async () => {
  //   setLoading(true);
  //   const response = await fetch(imgUrl);
  //   const blob = await response.blob();
  //   const url = URL.createObjectURL(blob);
  //   console.log(url);
  //   // setImg(url);
  //   setLoading(false);
  // };

  useEffect(() => {
    if (currentPage - 1 === page) {
      // getImage();
    }
  }, [currentPage, page]);

  return (
    <div className="carousel-slide">
      <div
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
          background: "#fff",
          fontSize: "20px",
          padding: "5px",
        }}
      >
        {page}
      </div>
      {page === currentPage - 1 && (
        <img
          className={`${loading ? "loading" : ""}`}
          src={imgUrl}
          onLoadStart={() => setLoading(true)}
          onLoad={() => setLoading(false)}
        />
      )}

      {loading ? <div>Loading...</div> : null}
    </div>
  );
};

export default CarouselSlide;

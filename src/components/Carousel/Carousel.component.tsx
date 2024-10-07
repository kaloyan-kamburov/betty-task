import { FC, useEffect, useRef, useState, WheelEvent } from "react";
import { CarouselProps } from "./Carousel.types";
import CarouselSlide from "./CarouselSlide.component";
import "./Carousel.styles.css";

const Carousel: FC<CarouselProps> = ({
  // infinite = true,
  // timePerSlide = 3000,
  timePerTransition = 1500,
  imgUrls = [],
  width = 200,
  height = 200,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [transitionInProgress, setTransitionInProgress] = useState<boolean>(false);
  const [transition, setTransition] = useState<string>(
    `transform ${timePerTransition / 1000}s ease`
  );

  const timeoutRef = useRef<number | null>(null);

  const onWheel = (e: WheelEvent) => {
    if (transitionInProgress) {
      return;
    }

    setTransitionInProgress(true);

    if (e.deltaY > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(currentPage + 1);
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setTransitionInProgress(false);
    }, timePerTransition);
  };

  useEffect(() => {
    if (!transitionInProgress) {
      if (currentPage === imgUrls.length + 1) {
        setTransition("none");
        setCurrentPage(1);
      } else if (currentPage === 0) {
        setTransition("none");
        setCurrentPage(imgUrls.length);
      }
      setTimeout(() => {
        setTransition(`transform ${timePerTransition / 1000}s ease`);
      }, 50);
    }
  }, [transitionInProgress]);

  return (
    <>
      <div className="carousel-wrapper" onWheel={onWheel}>
        <div
          className="carousel-viewport"
          style={{
            width,
            height,
          }}
        >
          <div
            className="slides-wrapper"
            style={{
              transform: `translateX(${-currentPage * width}px)`,
              transition,
            }}
          >
            <div
              style={{
                width,
              }}
            >
              <CarouselSlide
                imgUrl={imgUrls[imgUrls.length - 1]}
                page={imgUrls.length - 1}
                currentPage={currentPage}
              />
            </div>

            {imgUrls?.map((url, index) => (
              <div
                key={index}
                style={{
                  width,
                }}
              >
                <CarouselSlide imgUrl={url} page={index} currentPage={currentPage} />
              </div>
            ))}

            <div
              style={{
                width,
              }}
            >
              <CarouselSlide imgUrl={imgUrls[0]} page={0} currentPage={currentPage} />
            </div>
          </div>
        </div>
      </div>
      {currentPage}
      {JSON.stringify(transitionInProgress)}
    </>
  );
};

export default Carousel;

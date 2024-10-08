import { FC, useEffect, useRef, useState, WheelEvent } from "react";
import { CarouselProps } from "./Carousel.types";
import CarouselSlide from "./CarouselSlide.component";
import "./Carousel.styles.css";
import { useDebounce } from "../../utils/useDebounce";

const Carousel: FC<CarouselProps> = ({
  timePerTransition = 500,
  imgUrls = [],
  width = 200,
  height = 200,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [transitionInProgress, setTransitionInProgress] = useState<boolean>(false);
  const [transition, setTransition] = useState<string>(
    `transform ${timePerTransition / 1000}s ease`
  );
  const [cachedImages, setCachedImages] = useState<{ [page: number]: boolean }>({});

  const timeoutRef = useRef<number | null>(null);

  const onWheel = useDebounce((e: WheelEvent) => {
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
  }, 1);

  const onImgLoaded = (page: number) => {
    setCachedImages({ ...cachedImages, [page]: true });
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

  // useEffect(() => {
  //   console.log(cachedImages);
  // });

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
                onImgLoaded={onImgLoaded}
                cachedImages={cachedImages}
                loadExplicit
              />
            </div>

            {imgUrls?.map((url, index) => (
              <div
                key={index}
                style={{
                  width,
                }}
              >
                <CarouselSlide
                  imgUrl={url}
                  page={index}
                  currentPage={currentPage}
                  onImgLoaded={onImgLoaded}
                  cachedImages={cachedImages}
                  loadExplicit={index === imgUrls.length - 1}
                />
              </div>
            ))}
            <div
              style={{
                width,
              }}
            >
              <CarouselSlide
                imgUrl={imgUrls[0]}
                page={0}
                onImgLoaded={onImgLoaded}
                cachedImages={cachedImages}
                loadExplicit
              />
            </div>
          </div>
        </div>
      </div>
      {/* {currentPage}
      <pre>{JSON.stringify(cachedImages, null, 4)}</pre> */}
    </>
  );
};

export default Carousel;

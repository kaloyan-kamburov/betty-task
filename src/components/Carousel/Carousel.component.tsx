/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useRef, useState, WheelEvent } from "react";
import { CarouselProps } from "./Carousel.types";
import CarouselSlide from "./CarouselSlide.component";
import { useDebounce } from "../../utils/useDebounce";
import "./Carousel.styles.css";

const Carousel: FC<CarouselProps> = ({
  timePerTransition = 500,
  imgUrls = [],
  width = 0,
  height = 0,
  flexible = false,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [transitionInProgress, setTransitionInProgress] = useState<boolean>(false);
  const [transition, setTransition] = useState<string>();
  // `transform ${timePerTransition / 1000}s ease`
  const [cachedImages, setCachedImages] = useState<{ [page: number]: boolean }>({});
  const [dimenisons, setDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width,
    height,
  });
  // const [flexible, setFlexible] = useState<boolean>(flexible);

  const timeoutRef = useRef<number | null>(null);

  const onWheel = useDebounce((e: WheelEvent) => {
    e.stopPropagation();
    e.preventDefault();
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

  const onChangeSize = (width: number, height: number) => {
    setDimensions({ width, height });
  };

  useEffect(() => {
    if (!transitionInProgress) {
      if (currentPage === imgUrls.length + 1) {
        // setTransition("none");
        setCurrentPage(1);
      } else if (currentPage === 0) {
        // setTransition("none");
        setCurrentPage(imgUrls.length);
      }
      setTimeout(() => {
        // setTransition(`transform ${timePerTransition / 1000}s ease`);
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
            width: dimenisons.width,
            height: dimenisons.height,
          }}
        >
          <div
            className="slides-wrapper"
            style={{
              transform: `translateX(${-currentPage * dimenisons.width}px)`,
              transition,
            }}
          >
            <div
              style={{
                width: dimenisons.width,
              }}
            >
              <CarouselSlide
                imgUrl={imgUrls[imgUrls.length - 1]}
                page={imgUrls.length - 1}
                currentPage={currentPage}
                onImgLoaded={onImgLoaded}
                cachedImages={cachedImages}
                transitionInProgress={transitionInProgress}
                loadExplicit
                changeSize={onChangeSize}
                flexible={flexible}
                slidesLength={imgUrls.length}
              />
            </div>

            {imgUrls?.map((url, index) => (
              <div
                key={index}
                style={{
                  width: dimenisons.width,
                }}
              >
                <CarouselSlide
                  imgUrl={url}
                  page={index}
                  currentPage={currentPage}
                  onImgLoaded={onImgLoaded}
                  cachedImages={cachedImages}
                  loadExplicit={index === imgUrls.length - 1}
                  transitionInProgress={transitionInProgress}
                  changeSize={onChangeSize}
                  flexible={flexible}
                  slidesLength={imgUrls.length}
                />
              </div>
            ))}
            <div
              style={{
                width: dimenisons.width,
              }}
            >
              <CarouselSlide
                imgUrl={imgUrls[0]}
                page={0}
                onImgLoaded={onImgLoaded}
                cachedImages={cachedImages}
                loadExplicit
                transitionInProgress={transitionInProgress}
                changeSize={onChangeSize}
                flexible={flexible}
                slidesLength={imgUrls.length}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <button
        onClick={() => {
          setdimenisons.width(dimenisons.width === 200 ? 400 : 200);
          setdimenisons.height(dimenisons.height === 200 ? 400 : 200);
        }}
      >
        dsa
      </button> */}
      {currentPage}
      {`${transitionInProgress}`}
      {/* <label>
        <input
          type="checkbox"
          checked={flexible}
          onChange={() => setFlexible(!flexible)}
        />
        Flexible
      </label> */}

      <pre>{JSON.stringify(cachedImages, null, 4)}</pre>
    </>
  );
};

export default Carousel;

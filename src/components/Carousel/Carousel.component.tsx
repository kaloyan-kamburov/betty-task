import React, { FC, useEffect, useRef, useState, WheelEvent } from "react";
import { CarouselProps } from "./Carousel.types";
import CarouselSlide from "./CarouselSlide.component";
import { useDebounce } from "./utils/useDebounce";
import { calcProportionalHeight } from "./utils/hooks/calcProportionalHeight";
import "./Carousel.styles.css";

const Carousel: FC<CarouselProps> = ({
  timePerTransition = 500,
  imgUrls = [],
  width = 300,
  height = 300,
}) => {
  const defaultTransition = `transform ${timePerTransition / 1000}s ease`;
  const [carouselWidth, setCarouselWidth] = useState<number>(width);
  const [carouselHeight, setCarouselHeight] = useState<number>(height);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [transitionInProgress, setTransitionInProgress] = useState<boolean>(false);
  const [transition, setTransition] = useState<string>(defaultTransition);
  const [cachedImages, setCachedImages] = useState<{ [page: number]: boolean }>({});

  const transitionRef = useRef<NodeJS.Timeout | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const onWheel = useDebounce((e: WheelEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (transitionInProgress) {
      return;
    }

    setTransitionInProgress(true);

    //determine direction
    if (e.deltaY > 0) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(currentPage - 1);
    }

    if (transitionRef.current) {
      clearTimeout(transitionRef.current);
    }

    transitionRef.current = setTimeout(() => {
      setTransitionInProgress(false);
    }, timePerTransition);
  }, 1);

  const onImgLoaded = (page: number) => {
    //cache images to prevent reloading
    setCachedImages({ ...cachedImages, [page]: true });
  };

  const onWrapperResize = useDebounce(() => {
    if (!wrapperRef.current) return;
    //set width of the wrapper depending if it's wider or narrower than the initial width
    setCarouselWidth(
      wrapperRef?.current && wrapperRef?.current?.clientWidth >= width
        ? width
        : wrapperRef?.current?.clientWidth
    );
  }, 100);

  const onViewportResize = useDebounce(() => {
    //disable transition to prevent flickering
    setTransition("none");
    const newWidth =
      viewportRef?.current && viewportRef?.current?.clientWidth < width
        ? viewportRef?.current?.clientWidth
        : width;
    setCarouselWidth(newWidth);
    //calculate new height proportionally to the width
    const newHeight = calcProportionalHeight(width, height, newWidth);
    setCarouselHeight(newHeight);
    //return default transition
    setTimeout(() => {
      setTransition(defaultTransition);
    }, 500);
  }, 100);

  //swipe
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);
  const minSwipeLength = 20;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeLength;

    //if swipe occurs, determine left or right
    if (distance !== 0) {
      setTransitionInProgress(true);
      setCurrentPage(currentPage + (isLeftSwipe ? 1 : -1));

      //if swipe occurs during transition
      if (transitionRef.current) {
        clearTimeout(transitionRef.current);
      }

      transitionRef.current = setTimeout(() => {
        setTransitionInProgress(false);
      }, timePerTransition);
    }
  };

  useEffect(() => {
    if (!transitionInProgress) {
      //if on last page
      if (currentPage === imgUrls.length + 1) {
        setTransition("none");
        setCurrentPage(1);
        //if on first page
      } else if (currentPage === 0) {
        setTransition("none");
        setCurrentPage(imgUrls.length);
      }
      //return to default transition
      setTimeout(() => {
        setTransition(defaultTransition);
      }, 50);
    }
  }, [transitionInProgress]);

  useEffect(() => {
    if (!wrapperRef.current || !viewportRef.current) return;
    const wrapperObserver = new ResizeObserver(onWrapperResize);
    const resizeViewportObserver = new ResizeObserver(onViewportResize);
    wrapperObserver.observe(wrapperRef.current);
    resizeViewportObserver.observe(viewportRef.current);
    return () => {
      resizeViewportObserver.disconnect();
      wrapperObserver.disconnect();
    };
  }, []);

  return (
    <div
      className="carousel-wrapper"
      onWheel={!!imgUrls.length ? onWheel : undefined}
      ref={wrapperRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="carousel-viewport"
        style={{
          width: carouselWidth,
          height: carouselHeight,
        }}
        ref={viewportRef}
      >
        {!!imgUrls.length && (
          <div
            className="slides-wrapper"
            style={{
              transform: `translateX(${-currentPage * carouselWidth}px)`,
              transition,
              width: `${(imgUrls.length + 2) * carouselWidth}px`,
            }}
          >
            <CarouselSlide
              imgUrl={imgUrls[imgUrls.length - 1]}
              page={imgUrls.length - 1}
              currentPage={currentPage}
              onImgLoaded={onImgLoaded}
              cachedImages={cachedImages}
              // loadExplicit
              width={carouselWidth}
            />

            {imgUrls?.map((url, index) => (
              <CarouselSlide
                key={index}
                imgUrl={url}
                page={index}
                currentPage={currentPage}
                onImgLoaded={onImgLoaded}
                cachedImages={cachedImages}
                // loadExplicit={index === imgUrls.length - 1}
                width={carouselWidth}
              />
            ))}

            <CarouselSlide
              imgUrl={imgUrls[0]}
              page={0}
              onImgLoaded={onImgLoaded}
              cachedImages={cachedImages}
              loadExplicit
              width={carouselWidth}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;

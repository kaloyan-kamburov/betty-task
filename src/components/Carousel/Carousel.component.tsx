/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useRef, useState, WheelEvent } from "react";
import { CarouselProps } from "./Carousel.types";
import CarouselSlide from "./CarouselSlide.component";
import { useDebounce } from "./utils/useDebounce";
import { calcProportionalHeight } from "./utils/hooks/calcProportionalHeight";
import "./Carousel.styles.css";

const Carousel: FC<CarouselProps> = ({
  timePerTransition = 500,
  imgUrls = [],
  width = 200,
  height = 200,
}) => {
  const [carouselWidth, setCarouselWidth] = useState<number>(width);
  const [carouselHeight, setCarouselHeight] = useState<number>(height);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [transitionInProgress, setTransitionInProgress] = useState<boolean>(false);
  const [transition, setTransition] = useState<string>(
    `transform ${timePerTransition / 1000}s ease`
  );
  const [cachedImages, setCachedImages] = useState<{ [page: number]: boolean }>({});

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);

  const onWheel = useDebounce((e: WheelEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (transitionInProgress) {
      return;
    }

    setTransitionInProgress(true);

    if (e.deltaY > 0) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(currentPage - 1);
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

  const onWrapperResize = useDebounce(() => {
    if (!wrapperRef.current) return;
    setCarouselWidth(
      wrapperRef?.current && wrapperRef?.current?.clientWidth >= width
        ? width
        : wrapperRef?.current?.clientWidth
    );
  }, 100);

  const onViewportResize = useDebounce(() => {
    setTransition("none");
    const newWidth =
      viewportRef?.current && viewportRef?.current?.clientWidth < width
        ? viewportRef?.current?.clientWidth
        : width;
    setCarouselWidth(newWidth);
    const newHeight = calcProportionalHeight(width, height, newWidth);
    setCarouselHeight(newHeight);
    setTimeout(() => {
      setTransition(`transform ${timePerTransition / 1000}s ease`);
    }, 500);
  }, 100);

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

  useEffect(() => {
    if (!wrapperRef.current) return;
    if (!viewportRef.current) return;
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
              transitionInProgress={transitionInProgress}
              loadExplicit
              slidesLength={imgUrls.length}
              width={carouselWidth}
            />

            {imgUrls?.map((url, index) => (
              <CarouselSlide
                key={index}
                imgUrl={url}
                page={index}
                width={carouselWidth}
                currentPage={currentPage}
                onImgLoaded={onImgLoaded}
                cachedImages={cachedImages}
                loadExplicit={index === imgUrls.length - 1}
                transitionInProgress={transitionInProgress}
                slidesLength={imgUrls.length}
              />
            ))}

            <CarouselSlide
              imgUrl={imgUrls[0]}
              page={0}
              onImgLoaded={onImgLoaded}
              cachedImages={cachedImages}
              loadExplicit
              transitionInProgress={transitionInProgress}
              slidesLength={imgUrls.length}
              width={carouselWidth}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;

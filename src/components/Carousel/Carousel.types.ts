interface CarouselProps {
  timePerTransition?: number;
  imgUrls?: string[];
  width?: number;
  height?: number;
  flexible?: boolean;
}

interface CarouselSlideProps {
  imgUrl: string;
  page?: number;
  currentPage?: number;
  onImgLoaded: (page: number) => void;
  cachedImages: { [page: number]: boolean };
  imgUrls?: string[];
  loadExplicit?: boolean;
  transitionInProgress: boolean;
  changeSize?: (width: number, height: number) => void;
  flexible?: boolean;
  slidesLength: number;
}

export type { CarouselProps, CarouselSlideProps };

interface CarouselProps {
  infinite?: boolean;
  timePerSlide?: number;
  imgUrls?: string[];
  width?: number;
  height?: number;
  timePerTransition?: number;
}

interface CarouselSlideProps {
  imgUrl: string;
  page?: number;
  currentPage?: number;
  onImgLoaded: (page: number, blob: string) => void;
  cachedImages: { [page: number]: string };
  imgUrls?: string[];
  loadExplicit?: boolean;
}

export type { CarouselProps, CarouselSlideProps };

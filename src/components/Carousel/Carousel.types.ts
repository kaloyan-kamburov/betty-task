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
  page: number;
  currentPage: number;
}

export type { CarouselProps, CarouselSlideProps };

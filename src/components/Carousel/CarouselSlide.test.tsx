// import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { it, describe, expect, vitest } from "vitest";

import { CarouselSlideProps } from "./Carousel.types";
import CarouselSlide from "./CarouselSlide.component";

describe("CarouselSlide", () => {
  it("shows loading indicator, before the image is loaded", () => {
    const props: CarouselSlideProps = {
      imgUrl: "https://test.com/image.jpg",
      page: 0,
      currentPage: 0,
      onImgLoaded: vitest.fn(),
      cachedImages: {},
      loadExplicit: false,
      width: 100,
    };

    render(<CarouselSlide {...props} />);

    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });

  it("displays image when it's loaded", () => {
    const props: CarouselSlideProps = {
      imgUrl: "https://example.com/image.jpg",
      page: 0,
      currentPage: 0,
      onImgLoaded: vitest.fn(),
      cachedImages: {
        0: true,
      },
      loadExplicit: false,
      width: 100,
    };

    render(<CarouselSlide {...props} />);
    const imageElement = screen.getByAltText("Page 0");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", props.imgUrl);
  });

  it("should show error message and retry button when image fails to load", () => {
    const props = {
      imgUrl: "https://example.com/image.jpg",
      page: 0,
      currentPage: 1,
      onImgLoaded: vitest.fn(),
      cachedImages: {},
      loadExplicit: false,
      width: 100,
      transitionInProgress: false,
    };

    render(<CarouselSlide {...props} />);

    const imageElement = screen.getByAltText("Page 0");

    fireEvent.error(imageElement);

    const errorMessage = screen.getByText("An error occured");
    const retryButton = screen.getByText("Retry");

    expect(errorMessage).toBeInTheDocument();
    expect(retryButton).toBeInTheDocument();
  });
});

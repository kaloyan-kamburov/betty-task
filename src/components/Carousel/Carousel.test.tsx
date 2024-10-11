// import React from "react";
import { render } from "@testing-library/react";
import { it, describe, expect } from "vitest";

import { CarouselProps } from "./Carousel.types";
import Carousel from "./Carousel.component";

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe("Carousel", () => {
  window.ResizeObserver = ResizeObserver;
  it("renders the correct number of slides", () => {
    const props: CarouselProps = {
      imgUrls: [
        "https:/test.com/image1.jpg",
        "https:/test.com/image2.jpg",
        "https:/test.com/image3.jpg",
      ],
      width: 500,
      height: 500,
    };

    const { container } = render(<Carousel {...props} />);

    const slides = container.querySelectorAll(".carousel-slide");

    expect(slides.length).toEqual(props.imgUrls.length + 2);
  });

  it("renders no slides if there are no images provided", () => {
    const props: CarouselProps = {
      imgUrls: [],
      width: 500,
      height: 500,
    };

    const { container } = render(<Carousel {...props} />);

    const slides = container.querySelectorAll(".carousel-slide");

    expect(slides.length).toEqual(props.imgUrls.length);
  });
});

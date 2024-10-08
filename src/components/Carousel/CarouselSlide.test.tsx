import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CarouselSlide from "./CarouselSlide.component";

describe("CarouselSlide component", () => {
  const imgUrl = "https://example.com/image.jpg";
  const onImgLoaded = jest.fn();
  const page = 1;
  const currentPage = 1;
  const cachedImages = {};
  const loadExplicit = false;
  const width = 100;

  it("renders image with correct src", () => {
    const { getByRole } = render(
      <CarouselSlide
        imgUrl={imgUrl}
        page={page}
        currentPage={currentPage}
        onImgLoaded={onImgLoaded}
        cachedImages={cachedImages}
        loadExplicit={loadExplicit}
        width={width}
        transitionInProgress={false}
      />
    );
    const image = getByRole("img");
    expect(image).toHaveAttribute("src", imgUrl);
  });

  it("calls onImgLoaded when image is loaded", async () => {
    const { getByRole } = render(
      <CarouselSlide
        imgUrl={imgUrl}
        page={page}
        currentPage={currentPage}
        onImgLoaded={onImgLoaded}
        cachedImages={cachedImages}
        loadExplicit={loadExplicit}
        width={width}
        transitionInProgress={false}
      />
    );
    const image = getByRole("img");
    fireEvent.load(image);
    await waitFor(() => expect(onImgLoaded).toHaveBeenCalledTimes(1));
  });

  it("displays loader when image is loading", () => {
    const { getByText } = render(
      <CarouselSlide
        imgUrl={imgUrl}
        page={page}
        currentPage={currentPage}
        onImgLoaded={onImgLoaded}
        cachedImages={cachedImages}
        loadExplicit={loadExplicit}
        width={width}
        transitionInProgress={false}
      />
    );
    const loader = getByText("Loading...");
    expect(loader).toBeInTheDocument();
  });

  it("displays retry button when image fails to load", async () => {
    const { getByText } = render(
      <CarouselSlide
        imgUrl={"https://example.com/non-existent-image.jpg"}
        page={page}
        currentPage={currentPage}
        onImgLoaded={onImgLoaded}
        cachedImages={cachedImages}
        loadExplicit={loadExplicit}
        width={width}
        transitionInProgress={false}
      />
    );
    await waitFor(() => {
      const retryButton = getByText("Retry");
      expect(retryButton).toBeInTheDocument();
    });
  });
});

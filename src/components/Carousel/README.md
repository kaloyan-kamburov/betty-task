# Betty carousel

## The problem

Infinite image carousel (the items loop when the either end is reached) using
React. Navigation inside the carousel is only triggered by scroll, rather than
arrows or buttons.

- Work with images of different sizes and aspect ratios
- Work on devices with different screen sizes
- Work on both mobile and desktop
- Work equally well with a dozen of images, as well as 1000+ images
- Be reusable

## Usage

### With React Component

```js
import { Carousel } from "betty-carrousel";

function App() {
  return (
    <>
      <h1 className="text-center">Example carousel</h1>
      <Carousel
        imgUrls={[
          "https://picsum.photos/600/300",
          "https://picsum.photos/400/300",
          "https://picsum.photos/300/400",
          "https://picsum.photos/200/250",
        ]}
      />
    </>
  );
}
```

### Properties

- **timePerTransition**: number - determines transition speed in ms. Defaults to 500.
- **imgUrls**: string[] - array of image urls. **Required**
- **width**: number - carousel width. Defaults to 300.
- **height**: number - carousel height. Defaults to 300.

import Carousel from "./components/Carousel/Carousel.component";

function App() {
  return (
    <>
      <Carousel
        imgUrls={[
          "https://picsum.photos/200/200",
          "https://picsum.photos/200/250",
          "https://picsum.photos/300/200",
          "https://picsum.photos/340/320",
        ]}
      />
    </>
  );
}

export default App;

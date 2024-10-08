import Carousel from "./components/Carousel/Carousel.component";

function App() {
  return (
    <>
      <h1 className="text-center">Betty Carousel</h1>
      <Carousel
        imgUrls={[
          "https://picsum.photos/200/200",
          "https://picsum.photos/200/250",
          "https://picsum.photos/300/200",
          "https://picsum.photos/340/320",
        ]}
      />
      {/* <p className="text-center">
        <a href="https://github.com/kaloyan-kamburov/betty-task">GitHub source</a>
      </p>
      <p className="text-center">npm i @kaloyan-kamburov/betty-task</p> */}
    </>
  );
}

export default App;

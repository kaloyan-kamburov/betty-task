import Carousel from "./components/Carousel/Carousel.component";

function App() {
  return (
    <>
      <h1 className="text-center">Betty carousel task</h1>
      <Carousel
        width={500}
        height={500}
        imgUrls={[
          // "https://picsum.photos/300/400",
          // "https://picsum.photos/200/250",
          // "https://picsum.photos/450/600",
          // "https://picsum.photos/600/450",
          // "https://picsum.photos/500/500",
          // "https://picsum.photos/150/150",
          // "https://picsum.photos/600/300",

          "https://picsum.photos/300/300",
          "https://picsum.photos/400/400",
          "https://picsum.photos/500/500",
        ]}
      />
      <p className="text-center">
        <a href="https://github.com/kaloyan-kamburov/betty-task" target="_blank">
          GitHub source
        </a>
      </p>
      {/* <p className="text-center">npm i @kaloyan-kamburov/betty-task</p> */}
    </>
  );
}

export default App;

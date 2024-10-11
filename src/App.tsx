// import { Carousel } from "betty-carrousel";
import Carousel from "./components/Carousel/Carousel.component";

function App() {
  return (
    <>
      <h1 className="text-center">Betty carousel task</h1>
      <Carousel
        width={500}
        height={500}
        timePerTransition={350}
        imgUrls={[
          "https://scontent.fsof8-1.fna.fbcdn.net/v/t39.30808-6/450239729_791260459865789_599670013985958012_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=md8-UiOPzzUQ7kNvgF38qO-&_nc_ht=scontent.fsof8-1.fna&_nc_gid=AP7OR6auEIppIvRlXJ02smt&oh=00_AYDNvcTTEicWIuXQnA7cIf4p_GZztSeFY85NL0xfYQW9IA&oe=670DA1A5",
          "https://picsum.photos/600/300",
          "https://scontent.fsof8-1.fna.fbcdn.net/v/t39.30808-6/362269797_586535087004995_78963785773556087_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=bBcTQo26mFsQ7kNvgF2qrLe&_nc_ht=scontent.fsof8-1.fna&_nc_gid=Am3z5W_PH4Sm8YHLKrQTEJT&oh=00_AYBic4UTURQaNNqOPf9fHp54RU9bq3orl1xmA5-UXKlt3Q&oe=670D885_C",
          "https://picsum.photos/400/300",
          // "https://picsum.photos/300/400",
          // "https://picsum.photos/200/250",
          // "https://picsum.photos/450/600",
          // "https://picsum.photos/600/450",
          // "https://picsum.photos/500/500",
          // "https://picsum.photos/150/150",
          // "https://picsum.photos/600/300",
          // "https://picsum.photos/300/300",
          // "https://picsum.photos/400/400",
          // "https://picsum.photos/500/500",
          // "https://scontent.fsof8-1.fna.fbcdn.net/v/t39.30808-6/360117848_581134514211719_3477576577621715529_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=kux90_ShcjwQ7kNvgH9aA1m&_nc_ht=scontent.fsof8-1.fna&_nc_gid=AO74w5uQONzFeBJ2mY2IjJ5&oh=00_AYCwRqUOLNEPaIVXoO4gAPiqvK1kM5fJljyiVhYP_3Ekbw&oe=670D8591",
          // "https://picsum.photos/400/400",
          // "https://scontent.fsof8-1.fna.fbcdn.net/v/t39.30808-6/357775597_575882154736955_6336806733106597487_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=MzAzxdVCqwAQ7kNvgHSphNs&_nc_ht=scontent.fsof8-1.fna&_nc_gid=AMr0SzLxeY3mUKt-_Qls6Eu&oh=00_AYADthZ83DdZmh2CK53VG8gMOXlj2T2Im9DBKE90ed2Zlg&oe=670DA170",
        ]}
      />
      <p className="text-center">
        <a href="https://github.com/kaloyan-kamburov/betty-task" target="_blank">
          GitHub source
        </a>
      </p>
      <p className="text-center">
        <a href="https://www.npmjs.com/package/betty-carrousel" target="_blank">
          NPM package
        </a>
      </p>
    </>
  );
}

export default App;

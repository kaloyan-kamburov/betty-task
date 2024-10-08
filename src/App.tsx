import Carousel from "./components/Carousel/Carousel.component";

function App() {
  return (
    <>
      <h1 className="text-center">Betty carousel task</h1>
      <Carousel
        // width={300}
        // height={300}
        imgUrls={[
          // "https://picsum.photos/300/400",
          // "https://picsum.photos/200/250",
          // "https://picsum.photos/450/600",
          "https://picsum.photos/600/450",
          "https://picsum.photos/350/300",
          "https://picsum.photos/150/150",
          "https://picsum.photos/300/300",
          // "https://scontent.fsof8-1.fna.fbcdn.net/v/t39.30808-6/462322708_473664828993597_8717026968926304156_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=LzKGys2LTQoQ7kNvgF6dzG5&_nc_ht=scontent.fsof8-1.fna&_nc_gid=AY3_qPpwmGQqJnwa7XQ6RBA&oh=00_AYCwH7tLHTfasAir9KFVR8ABIQ44QP7beCaQmw26hLR6Xw&oe=670A06E4",
          // "https://scontent.fsof8-1.fna.fbcdn.net/v/t39.30808-6/462261488_473664832326930_2795174708684601240_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Vw9RirDqHA8Q7kNvgGOddhX&_nc_ht=scontent.fsof8-1.fna&_nc_gid=A0a3jCQcKXcmRKpuJN_NmXO&oh=00_AYAoV5xgapkWpndtXoGgGBmv5jXPy-SLG428jU9rXhPfkw&oe=670A0A63",
          // "https://scontent.fsof11-1.fna.fbcdn.net/v/t39.30808-6/462146027_473664825660264_678782586998491918_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=nnIk8SbVa9cQ7kNvgEK-mgd&_nc_ht=scontent.fsof11-1.fna&_nc_gid=ATm2XLo7gYFeU8kpfWX-cOl&oh=00_AYCiTalJw9b1wrNT0zBAkCkile6ZoFbgi5sZN-QKnJZ-qw&oe=670A14C2",
          // "https://scontent.fsof11-1.fna.fbcdn.net/v/t39.30808-6/462231391_473664908993589_6268380297074135567_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=1_Rw92xA-88Q7kNvgH48RRP&_nc_ht=scontent.fsof11-1.fna&_nc_gid=Ap_jeRKt2GSK89cUyMs5PQU&oh=00_AYBhgbhjdoRur64z70EpKPBu_uFDMp6rkwyktzcBLw9Bwg&oe=670A1882",
        ]}
        flexible
      />
      {/* <p className="text-center">
        <a href="https://github.com/kaloyan-kamburov/betty-task">GitHub source</a>
      </p>
      <p className="text-center">npm i @kaloyan-kamburov/betty-task</p> */}
    </>
  );
}

export default App;

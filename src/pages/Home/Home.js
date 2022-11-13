import "./Home.scss";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import Carousel from "../../components/Carousel/Carousel";
import CarouselItem from "../../components/CarouselItem/CarouselItem";
import Tiger from "../../assets/animations/tiger.json";
import Sheep from "../../assets/animations/DifficultyAnimations/easyDifficultyAnimation.json";
import Cameleon from "../../assets/animations/camaleon.json";
import Cat from "../../assets/animations/catSleeping.json";
const Home = () => {
  return (
    <>
      <h1 className="home__title">🎲 PICK A GAME 🎲</h1>

      <Carousel className="home__decks">
        <CarouselItem>
          <Link className="home__link" to={`/tic-tac-toe`}>
            <div className="home__link-title">TIC TAC TOE</div>
            <div className="home__animations">
              <Lottie animationData={Tiger} />
            </div>
          </Link>
        </CarouselItem>
        <CarouselItem>
          <Link className="home__link" to={`/chess`}>
            <div className="home__link-title">CHESS</div>
            <div className="home__animations">
              <Lottie animationData={Cat} />
            </div>
          </Link>
        </CarouselItem>
        <CarouselItem>
          <Link className="home__link" to={`/sudoku`}>
            <div className="home__link-title">SUDOKU</div>
            <div className="home__animations">
              <Lottie animationData={Sheep} />
            </div>
          </Link>
        </CarouselItem>
        <CarouselItem>
          <Link className="home__link" to={`/connect-4`}>
            <div className="home__link-title">CONNECT 4</div>
            <div className="home__animations">
              <Lottie animationData={Cameleon} />
            </div>
          </Link>
        </CarouselItem>
      </Carousel>
    </>
  );
};

export default Home;

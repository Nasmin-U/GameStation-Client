import "./GameOver.scss";
import PropTypes from "prop-types";
import { useContext } from "react";
import { GameContext } from "../../../context/GameContext";
import Button from "../../Button/Button";

const GameOver = ({ closeModal }) => {
  const { status, turn } = useContext(GameContext);
  let winner;
  if (status === "checkmate") {
    if (turn === "b") {
      winner = "white";
    } else {
      winner = "black";
    }
  }
  return (
    <div className="GameOverModal">
      <div className="GameOverModal-container">
        <div className="GameOverModal-close-btn-container">
          <button onClick={closeModal}>X</button>
        </div>
        <div className="modal-title GameOverModal-title">
          <h1>Game Over</h1>
        </div>
        <div className="GameOverModal-body">
          <p className="GameOverModal__item">
            The game ended in a <mark>{status}</mark>
          </p>
          <p className="GameOverModal__item">
            <mark>{winner}</mark> won
          </p>
          <p className="GameOverModal__item">
            <img
              src={require("../../../assets/play-again.png")}
              alt="play again"
              className="GameOverModal-img"
            />
          </p>
        </div>
        <div className="modal-footer GameOverModal-footer">
          <Button
            onClick={() => window.open("http://localhost:3000/chess")}
            buttonStyle="btn--primary--solid"
            text="Play"
          />
        </div>
      </div>
    </div>
  );
};
GameOver.prototype = {
  closeModal: PropTypes.func.isRequired,
};
export default GameOver;

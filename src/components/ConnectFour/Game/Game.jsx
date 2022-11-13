import "./Game.scss";
import { useState } from "react";
import ConnectFourBoard from "../Board/Board";
import { v4 as uuid } from "uuid";
import InformationModal from "../InformationModal/InformationModal";

const Game = () => {
  let initial = {};
  for (let col = 0; col < 7; col++) {
    initial[col] = [null, null, null, null, null, null];
  }
  const [showInformationModal, setShowInformationModal] = useState(false);
  const [gameState, setGameState] = useState(initial);
  const [currentPlayer, setCurrentPlayer] = useState("🔴");
  const [winner, setWinner] = useState(null);

  const gameOver = () => {
    ///check for column wins///////////////////////////////////////////////////
    for (let c = 0; c < 7; c++) {
      for (let r = 0; r < 6 - 3; r++) {
        if (
          gameState[c][r] !== null &&
          gameState[c][r] === gameState[c][r + 1] &&
          gameState[c][r + 1] === gameState[c][r + 2] &&
          gameState[c][r + 2] === gameState[c][r + 3]
        ) {
          return true;
        }
      }
    }
    ///check for row wins//////////////////////////////////////////////////////
    for (let c = 0; c < 4; c++) {
      for (let r = 0; r < 6; r++) {
        if (
          gameState[c][r] !== null &&
          gameState[c][r] === gameState[c + 1][r] &&
          gameState[c + 1][r] === gameState[c + 2][r] &&
          gameState[c + 2][r] === gameState[c + 3][r]
        ) {
          return true;
        }
      }
    }
    /// check for wins diagonals left to right /////////////////////////////////
    for (let c = 0; c < 4; c++) {
      for (let r = 0; r < 4; r++) {
        if (
          gameState[c][r] !== null &&
          gameState[c][r] === gameState[c + 1][r + 1] &&
          gameState[c + 1][r + 1] === gameState[c + 2][r + 2] &&
          gameState[c + 2][r + 2] === gameState[c + 3][r + 3]
        ) {
          return true;
        }
      }
    }
    for (let c = 0; c < 4; c++) {
      for (let r = 1; r < 5; r++) {
        if (
          gameState[c][r] !== null &&
          gameState[c][r] === gameState[c + 1][r + 1] &&
          gameState[c + 1][r + 1] === gameState[c + 2][r + 2] &&
          gameState[c + 2][r + 2] === gameState[c + 3][r + 3]
        ) {
          return true;
        }
      }
    }
    for (let c = 0; c < 4; c++) {
      for (let r = 2; r < 6; r++) {
        if (
          gameState[c][r] !== null &&
          gameState[c][r] === gameState[c + 1][r + 1] &&
          gameState[c + 1][r + 1] === gameState[c + 2][r + 2] &&
          gameState[c + 2][r + 2] === gameState[c + 3][r + 3]
        ) {
          return true;
        }
      }
    }

    ///check for diagonal wins right to left ////////////////////////////////
    for (let c = 6; c > 2; c--) {
      for (let r = 0; r < 4; r++) {
        if (
          gameState[c][r] !== null &&
          gameState[c][r] === gameState[c - 1][r + 1] &&
          gameState[c - 1][r + 1] === gameState[c - 2][r + 2] &&
          gameState[c - 2][r + 2] === gameState[c - 3][r + 3]
        ) {
          return true;
        }
      }
    }
    for (let c = 6; c > 2; c--) {
      for (let r = 1; r < 5; r++) {
        if (
          gameState[c][r] !== null &&
          gameState[c][r] === gameState[c - 1][r + 1] &&
          gameState[c - 1][r + 1] === gameState[c - 2][r + 2] &&
          gameState[c - 2][r + 2] === gameState[c - 3][r + 3]
        ) {
          return true;
        }
      }
    }
    for (let c = 6; c > 2; c--) {
      for (let r = 2; r < 6; r++) {
        if (
          gameState[c][r] !== null &&
          gameState[c][r] === gameState[c - 1][r + 1] &&
          gameState[c - 1][r + 1] === gameState[c - 2][r + 2] &&
          gameState[c - 2][r + 2] === gameState[c - 3][r + 3]
        ) {
          return true;
        }
      }
    }
    /////////////////////////////////////////////////////////////////////////
    return false;
  };
  const addToken = (index) => {
    const col = gameState[index];
    const tokenPos = col.indexOf(null);
    col[tokenPos] = currentPlayer;
    setGameState({
      ...gameState,
      [index]: col,
    });
    if (gameOver()) {
      setWinner(currentPlayer);
    }
    setCurrentPlayer(currentPlayer === "🔴" ? "🟡" : "🔴");
  };

  return (
    <section className="c4__main">
      <h1
        className="c4__title"
        onClick={() => setShowInformationModal((show) => !show)}
      >
        Connect 4
      </h1>
      {showInformationModal && (
        <InformationModal
          closeModal={() => setShowInformationModal((show) => !show)}
        />
      )}
      <div className="c4__board">
        {Object.entries(gameState).map(([k, col], i) => {
          return (
            <div key={uuid()}>
              <ConnectFourBoard
                key={uuid()}
                col={col}
                onClick={() => {
                  addToken(i);
                }}
              />
            </div>
          );
        })}
      </div>
      <h2 className="c4__win-status">
        {" "}
        {winner ? `The winner is ${winner}` : "Game in progress..."}
      </h2>
    </section>
  );
};

export default Game;

import "./Game.scss";
import { useEffect, useState } from "react";
import Cell from "../Cell/Cell";
import InformationModal from "../InformationModal/InformationModal";

const Game = ({ socket, roomCode }) => {
  const [showInformationModal, setShowInformationModal] = useState(false);
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [canPlay, setCanPlay] = useState(true);
  const [winner, setWinner] = useState(
    <div className="ticTacToe__initial-state">🤔</div>
  );
  const [a, setA] = useState([]);
  useEffect(() => {
    socket.on("updateGame", (id) => {
      setBoard((data) => ({ ...data, [id]: "O" }));
      setCanPlay(true);
      setA.push(id);
    });

    return () => socket.off("updateGame");
  });

  const handleCellClick = (e) => {
    const id = e.currentTarget.id;
    if (canPlay && board[id] === "") {
      setBoard((data) => ({ ...data, [id]: "X" }));
      socket.emit("play", { id, roomCode });
      setCanPlay(false);
    }
    if (
      (board[0] === "X" && board[1] === "X" && board[2] === "X") ||
      (board[3] === "X" && board[4] === "X" && board[5] === "X") ||
      (board[6] === "X" && board[7] === "X" && board[8] === "X") ||
      (board[0] === "X" && board[3] === "X" && board[6] === "X") ||
      (board[1] === "X" && board[4] === "X" && board[7] === "X") ||
      (board[2] === "X" && board[5] === "X" && board[8] === "X") ||
      (board[2] === "X" && board[4] === "X" && board[6] === "X") ||
      (board[0] === "X" && board[4] === "X" && board[8] === "X")
    ) {
      setWinner("X");
    }
    if (
      (board[0] === "O" && board[1] === "O" && board[2] === "O") ||
      (board[3] === "O" && board[4] === "O" && board[5] === "O") ||
      (board[6] === "O" && board[7] === "O" && board[8] === "O") ||
      (board[0] === "O" && board[3] === "O" && board[6] === "O") ||
      (board[1] === "O" && board[4] === "O" && board[7] === "O") ||
      (board[2] === "O" && board[5] === "O" && board[8] === "O") ||
      (board[2] === "O" && board[4] === "O" && board[6] === "O") ||
      (board[0] === "O" && board[4] === "O" && board[8] === "O")
    ) {
      setWinner("O");
    }
  };
  return (
    <main className="ticTacToe">
      <h1
        onClick={() => setShowInformationModal((show) => !show)}
        className="ticTacToe__title"
      >
        Tic Tac Toe
      </h1>
      {showInformationModal && (
        <InformationModal
          closeModal={() => setShowInformationModal((show) => !show)}
          roomCode={roomCode}
        />
      )}
      <section className="ticTacToe__section">
        <Cell handleCellClick={handleCellClick} id={"0"} text={board[0]} />
        <Cell handleCellClick={handleCellClick} id={"1"} text={board[1]} />
        <Cell handleCellClick={handleCellClick} id={"2"} text={board[2]} />

        <Cell handleCellClick={handleCellClick} id={"3"} text={board[3]} />
        <Cell handleCellClick={handleCellClick} id={"4"} text={board[4]} />
        <Cell handleCellClick={handleCellClick} id={"5"} text={board[5]} />

        <Cell handleCellClick={handleCellClick} id={"6"} text={board[6]} />
        <Cell handleCellClick={handleCellClick} id={"7"} text={board[7]} />
        <Cell handleCellClick={handleCellClick} id={"8"} text={board[8]} />
      </section>
      <h2 className="ticTacToe__winner">
        The WINNER is:{" "}
        <span className="ticTacToe__winner--underline"> {winner} </span>
      </h2>
    </main>
  );
};

export default Game;

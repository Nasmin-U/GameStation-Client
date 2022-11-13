import "./ChessGame.scss";
import { useState, useRef, useEffect, useContext } from "react";
import Chess from "chess.js";
import io from "socket.io-client";
import getGameOverState from "../../utils/chessFunctions/game-over.js";
import { createBoard } from "../../utils/chessFunctions";
import { GameContext } from "../../context/GameContext";
import { types } from "../../context/Actions";
import Board from "../../components/Chess/Board/Board";
import GameOver from "../../components/Chess/GameOver/GameOver";
import InformationModal from "../../components/Chess/InformationModal/InformationModal";

const FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
//checkmate fen : rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3
//stalemate/draw fen :4k3/4P3/4K3/8/8/8/8/8 b - - 0 78

const socket = io("localhost:5001/chess");

const ChessGame = ({ roomCode }) => {
  const [showInformationModal, setShowInformationModal] = useState(false);
  const [fen, setFen] = useState(FEN);
  const { current: chess } = useRef(new Chess(fen));
  const [board, setBoard] = useState(createBoard(fen));
  const { dispatch, gameOver } = useContext(GameContext);
  let code = roomCode;

  useEffect(() => {
    setBoard(createBoard(fen));
  }, [fen]);

  useEffect(() => {
    socket.emit(
      "join",
      { name: "Nasmin", gameID: code },
      ({ error, color }) => {
        if (error) {
          console.log("error on join");
        }
      }
    );
    socket.on("Welcome", ({ message, opponent }) => {
      console.log({ message, opponent });
    });
    socket.on("opponentJoin", ({ message, opponent }) => {
      console.log({ message, opponent });
    });

    socket.on("opponentMove", ({ from, to }) => {
      chess.move({ from, to });
      setFen(chess.fen());
    });
  }, [chess]);

  useEffect(() => {
    const [gameOver, status] = getGameOverState(chess);
    if (gameOver) {
      dispatch({ type: types.GAME_OVER, status, player: chess.turn() });
      return;
    }
    dispatch({
      type: types.SET_TURN,
      player: chess.turn(),
      check: chess.in_check(),
    });
  }, [fen, dispatch, chess]);

  const fromPos = useRef();

  const makeMove = (pos) => {
    const from = fromPos.current;
    chess.move({ from, to: pos });
    dispatch({ type: types.CLEAR_POSSIBLE_MOVES });
    setFen(chess.fen());
    console.log(`code is ${code}`);
    socket.emit("move", { gameID: code, from, to: pos });
  };

  const setFromPos = (pos) => {
    fromPos.current = pos;
    dispatch({
      type: types.SET_POSSIBLE_MOVES,
      moves: chess.moves({ square: pos }),
    });
  };
  if (gameOver) {
    return <GameOver />;
  }
  return (
    <div className="game">
      <h1
        onClick={() => setShowInformationModal((show) => !show)}
        className="chess__title"
      >
        Chess
      </h1>
      {showInformationModal && (
        <InformationModal
          closeModal={() => setShowInformationModal((show) => !show)}
        />
      )}
      <Board cells={board} makeMove={makeMove} setFromPos={setFromPos} />
    </div>
  );
};

export default ChessGame;

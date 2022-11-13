import Game from "../components/TicTacToe/Game/Game";

const TicTacToe = ({ socket, roomCode }) => {
  return <Game socket={socket} roomCode={roomCode} />;
};

export default TicTacToe;

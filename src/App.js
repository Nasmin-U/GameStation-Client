import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

/////////////////////////chess///////////////////////////////////
import ChessGame from "./pages/ChessGame/ChessGame";
import { GameProvider } from "./context/GameContext";
///////////////////////////tic tac toe///////////////////////////
import TicTacToe from "./pages/TicTacToe";
import io from "socket.io-client";
///////////////////////////home//////////////////////////////////
import Home from "./pages/Home/Home";
/////////////////////////////footer//////////////////////////////
import JoinRoomModal from "./components/RoomModal/RoomModal";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
/////////////////////////sudoku//////////////////////////////////
import Sudoku from "./pages/Sudoku/Sudoku";
/////////////////////////connect four////////////////////////////
import ConnectFour from "./pages/ConnectFour";

const socketTTT = io.connect("http://localhost:5001/tic-tac-toe");

function App() {
  const [showModal, setShowModal] = useState(false);
  const [roomCode, setRoomCode] = useState(null);
  const [toStringCode, setToStringCode] = useState("");
  useEffect(() => {
    if (roomCode) {
      socketTTT.emit("joinRoom", roomCode);
      setToStringCode(roomCode.toString());
    }
  }, [roomCode]);
  return (
    <BrowserRouter>
      <Header />
      <JoinRoomModal
        showModal={showModal}
        setShowModal={setShowModal}
        setRoomCode={setRoomCode}
      />
      <Routes>
        <Route path="/connect-4" element={<ConnectFour />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/tic-tac-toe"
          element={<TicTacToe socket={socketTTT} roomCode={roomCode} />}
        />
        <Route path="/sudoku" element={<Sudoku />} />
        <Route
          path="/chess"
          element={
            <GameProvider>
              <ChessGame roomCode={toStringCode} />
            </GameProvider>
          }
        />
      </Routes>
      <Footer setShowModal={setShowModal} />
    </BrowserRouter>
  );
}

export default App;

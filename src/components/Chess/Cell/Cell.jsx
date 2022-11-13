import "./Cell.scss";
import { useContext } from "react";
import PropTypes from "prop-types";
import {
  isLightSquare,
  Cell as BoardCell,
} from "../../../utils/chessFunctions";
import Piece from "../Piece/Piece";
import { GameContext } from "../../../context/GameContext";

const ChessCell = ({ cell, index, makeMove, setFromPos }) => {
  const light = isLightSquare(cell.pos, index);

  const { possibleMoves, turn, check } = useContext(GameContext);
  const isPossibleMove = possibleMoves.includes(cell.pos);

  const color = cell.piece.toUpperCase() === cell.piece ? "w" : "b";

  const inCheck = () => {
    const king = cell.piece.toUpperCase() === "K";
    return turn === color && king && check;
  };

  const handleDrop = () => makeMove(cell.pos);

  return (
    <div
      className={`cell ${light ? "light" : "dark"}`}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div
        className={`overlay ${isPossibleMove && "possible-move"} ${
          inCheck() && "check"
        }`}
      >
        <Piece pos={cell.pos} name={cell.piece} setFromPos={setFromPos} />
      </div>
    </div>
  );
};

ChessCell.prototype = {
  cell: PropTypes.instanceOf(BoardCell).isRequired,
  index: PropTypes.number.isRequired,
  makeMove: PropTypes.func,
  setFromPos: PropTypes.func,
};
export default ChessCell;
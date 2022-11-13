import "./Board.scss";
import PropTypes from "prop-types";
import ChessCell from "../Cell/Cell";

const Board = ({ cells, ...props }) => {
  return (
    <div className="board">
      {cells.map((cell, index) => (
        <ChessCell cell={cell} index={index} key={cell.pos} {...props} />
      ))}
    </div>
  );
};

Board.prototype = {
  cells: PropTypes.array.isRequired,
  makeMove: PropTypes.func,
  setFromPos: PropTypes.func,
};
export default Board;

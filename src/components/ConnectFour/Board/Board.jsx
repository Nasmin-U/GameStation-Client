import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";

const Board = ({ col, onClick }) => {
  return (
    <div className="c4__column" onClick={onClick}>
      {col.map((cell) => {
        return (
          <span className="c4__cell" key={uuid()}>
            {cell}
          </span>
        );
      })}
    </div>
  );
};
Board.prototype = {
  col: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default Board;

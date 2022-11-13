import "./Cell.scss";
import PropTypes from "prop-types";

const Cell = (props) => {
  let { cell, handleClickCallback } = props;

  const getCellClassName = (cell) => {
    let { row, column } = cell;
    let className = `sudoku__cell 
    ${row === 2 || row === 5 ? "sudoku__border-bottom" : ""}
    ${column === 2 || column === 5 ? "sudoku__border-right" : ""}
    ${cell.isValid ? "" : "sudoku__cell-invalid"}
    ${cell.isModifiable ? "sudoku__cell-modifiable" : ""}
    ${cell.isHinted ? "sudoku__cell-hinted" : ""}
    `;
    return className;
  };

  return (
    <td
      className={getCellClassName(cell)}
      onClick={() =>
        handleClickCallback(cell.row, cell.column, cell.isModifiable)
      }
    >
      {cell.value !== 0 ? cell.value : ""}
    </td>
  );
};
Cell.prototype = {
  props: PropTypes.object.isRequired,
};
export default Cell;

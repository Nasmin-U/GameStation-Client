import "./Grid.scss";
import PropTypes from "prop-types";
import { Cell } from "../Index";

const Grid = ({ grid, handleCellClick }) => {
  return (
    <table className="grid-table">
      <tbody>
        {grid &&
          grid.map((row, rowIndex) => {
            return (
              <tr className="row" key={rowIndex}>
                {row.map((cell, columnIndex) => {
                  return (
                    <Cell
                      key={rowIndex + "-" + columnIndex}
                      cell={cell}
                      handleClickCallback={handleCellClick}
                    />
                  );
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
Grid.prototype = {
  grid: PropTypes.object.isRequired,
  handleCellClick: PropTypes.func.isRequired,
};
export default Grid;

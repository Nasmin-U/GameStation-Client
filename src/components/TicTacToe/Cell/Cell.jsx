import "./Cell.scss";
import PropTypes from "prop-types";

const Cell = ({ handleCellClick, id, text }) => {
  return (
    <div id={id} className="TTT-cell" onClick={handleCellClick}>
      {text}
    </div>
  );
};
Cell.prototype = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleCellClick: PropTypes.func.isRequired,
};
export default Cell;

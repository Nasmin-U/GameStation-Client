import "./InputOptions.scss";
import PropTypes from "prop-types";
import { FaEraser } from "react-icons/fa";

const SET1 = [1, 2, 3, 4, 5];
const SET2 = [6, 7, 8, 9];

const InputOptions = ({ setClickValue, selected }) => {
  return (
    <div className="InputOptions">
      <div className="choice-container choices-one">
        {SET1.map((choice) => {
          let selectedClass = choice === selected ? "selected" : "";
          return (
            <div
              className={`choice ${selectedClass} noSelect `}
              key={`key-1-${choice}`}
              onClick={() => setClickValue(choice)}
            >
              <p className="choice-text">{choice}</p>
            </div>
          );
        })}
      </div>
      <div className="choice-container choices-two">
        {SET2.map((choice) => {
          let selectedClass = choice === selected ? "selected" : "";
          return (
            <div
              className={`choice ${selectedClass} noSelect`}
              key={`key-2-${choice}`}
              onClick={() => setClickValue(choice)}
            >
              <p className="choice-text">{choice}</p>
            </div>
          );
        })}

        {/* Eraser class: value of zero */}
        <div
          className={`choice 
                    ${selected === 0 ? "selected-eraser" : ""} 
                    noSelect`}
          key={`key-2-${0}`}
          onClick={() => setClickValue(0)}
        >
          <FaEraser />
        </div>
      </div>
    </div>
  );
};
InputOptions.prototype = {
  selected: PropTypes.number.isRequired,
  setClickValue: PropTypes.func.isRequired,
};
export default InputOptions;

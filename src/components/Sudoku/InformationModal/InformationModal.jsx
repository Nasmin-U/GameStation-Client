import "./InformationModal.scss";
import PropTypes from "prop-types";
import Button from "../../Button/Button";

const InformationModal = ({ closeModal }) => {
  return (
    <div className="InformationModal">
      <div className="InformationModal-container">
        <div className="InformationModal-close-btn-container">
          <button onClick={closeModal}>X</button>
        </div>
        <div className="modal-title InformationModal-title">
          <h1>Sudoku Rules</h1>
        </div>
        <div className="InformationModal-body">
          <ul className="InformationModal-list">
            <li className="InformationModal-list__item">
              Sudoku grid consists of 9x9 spaces.
            </li>
            <li className="InformationModal-list__item">
              You can use only numbers from 1 to 9.
            </li>
            <li className="InformationModal-list__item">
              Each 3×3 block can only contain numbers from 1 to 9.
            </li>
            <li className="InformationModal-list__item">
              Each vertical column can only contain numbers from 1 to 9.
            </li>
            <li className="InformationModal-list__item">
              Each horizontal row can only contain numbers from 1 to 9.
            </li>
            <li className="InformationModal-list__item">
              Each number in the 3×3 block, vertical column or horizontal row
              can be used only once.
            </li>
            <li className="InformationModal-list__item">
              The game is over when the whole Sudoku grid is correctly filled
              with numbers.
            </li>
          </ul>
        </div>
        <div className="modal-footer InformationModal-footer">
          <Button
            onClick={() => window.open("https://sudoku.com/sudoku-rules/")}
            buttonStyle="btn--primary--solid"
            text="Find out more"
          />
          <Button
            onClick={closeModal}
            buttonStyle="btn--success--solid"
            text="Continue"
          />
        </div>
      </div>
    </div>
  );
};
InformationModal.prototype = {
  closeModal: PropTypes.func.isRequired,
};
export default InformationModal;

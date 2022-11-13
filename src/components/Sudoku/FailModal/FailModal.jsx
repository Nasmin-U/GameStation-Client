import "./FailModal.scss";
import PropTypes from "prop-types";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";

import Button from "../../Button/Button";

const NoSolutionFoundModal = ({ closeModal }) => {
  return (
    <div className="NoSolutionFoundModal">
      <div className="NoSolutionFoundModal-container">
        <div className="NoSolutionFoundModal-close-btn-container">
          <button
            className="NoSolutionFoundModal-close-btn-container-button"
            onClick={closeModal}
          >
            X
          </button>
        </div>
        <div className="NoSolutionFoundModal-title">
          <h1>Ooops...</h1>
        </div>
        <div className="NoSolutionFoundModal-body">
          <p>
            One OR more values in the grid are misplaced, try making some
            changes <HiOutlineWrenchScrewdriver />
          </p>
        </div>
        <div className="NoSolutionFoundModal-footer">
          <Button
            onClick={closeModal}
            buttonStyle="btn--primary--solid"
            text="Continue"
          />
        </div>
      </div>
    </div>
  );
};
NoSolutionFoundModal.prototype = {
  closeModal: PropTypes.func.isRequired,
};

export default NoSolutionFoundModal;

import "./InformationModal.scss";
import PropTypes from "prop-types";
import Cat from "../../../assets/animations/badCat.json";
import Lottie from "lottie-react";
import Button from "../../Button/Button";

const InformationModal = ({ closeModal }) => {
  return (
    <div className="ChessInformationModal">
      <div className="ChessInformationModal-container">
        <div className="ChessInformationModal-close-btn-container">
          <button onClick={closeModal}>X</button>
        </div>
        <div className="modal-title ChessInformationModal-title">
          <h1>Chess Details</h1>
        </div>
        <div className="ChessInformationModal-body">
          <div className="ChessInformationModal__animations">
            <Lottie animationData={Cat} />
          </div>

          <h2 className="ChessInformationModal-list__item">
            There's too many rules to explain here, just click the button.
          </h2>
        </div>
        <div className="modal-footer ChessInformationModal-footer">
          <Button
            onClick={() =>
              window.open("https://www.chess.com/learn-how-to-play-chess")
            }
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

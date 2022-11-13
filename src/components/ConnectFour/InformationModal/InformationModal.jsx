import "./InformationModal.scss";
import PropTypes from "prop-types";
import Lottie from "lottie-react";
import Sheep from "../../../assets/animations/sheep.json";
import Button from "../../Button/Button";

const InformationModal = ({ closeModal }) => {
  return (
    <div className="C4InformationModal">
      <div className="C4InformationModal-container">
        <div className="C4InformationModal-close-btn-container">
          <button onClick={closeModal}>X</button>
        </div>
        <div className="modal-title C4InformationModal-title">
          <h1>Connect Four Details</h1>
        </div>
        <div className="C4InformationModal-body">
          <div className="C4InformationModal__animations">
            <Lottie animationData={Sheep} />
          </div>

          <p className="C4InformationModal-list__item">
            The first player to connect 4 of the same colored discs in a row
            (either{" "}
            <span className="C4InformationModal-list__item--underline">
              vertically
            </span>
            ,{" "}
            <span className="C4InformationModal-list__item--underline">
              horizontally
            </span>
            , or{" "}
            <span className="C4InformationModal-list__item--underline">
              diagonally
            </span>
            ) wins.
          </p>
          <p className="C4InformationModal-list__item">
            Players must alternate turns, and only one disc can be dropped in
            each turn.
          </p>
        </div>
        <div className="modal-footer C4InformationModal-footer">
          <Button
            onClick={() =>
              window.open(
                "https://www.gamesver.com/the-rules-of-connect-4-according-to-m-bradley-hasbro/"
              )
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

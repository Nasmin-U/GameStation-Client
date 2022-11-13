import "./InformationModal.scss";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import Llama from "../../../assets/animations/dancingLlama.json";
import Button from "../../Button/Button";

const InformationModal = ({ closeModal, roomCode }) => {
  const [room, setRoom] = useState("...");
  useEffect(() => {
    setRoom(roomCode);
  }, [roomCode]);

  return (
    <div className="TTTInformationModal">
      <div className="TTTInformationModal-container">
        <div className="TTTInformationModal-close-btn-container">
          <button onClick={closeModal}>X</button>
        </div>
        <div className="modal-title TTTInformationModal-title">
          <h1>Tic Tac Toe Details</h1>
        </div>
        <h2 className="TTTInformationModal__room">Room Code : {room}</h2>
        <div className="TTTInformationModal-body">
          <div className="TTTInformationModal__animations">
            <Lottie animationData={Llama} />
          </div>
          <h2 className="TTTInformationModal-list__item">
            The game ends once:
          </h2>
          <p className="TTTInformationModal-list__item">
            A player manages to place 3 allotted marks (🐰 or 🐢) in a
            continuous line,{" "}
            <span className="TTTInformationModal-list__item--underline">
              vertically
            </span>
            ,{" "}
            <span className="TTTInformationModal-list__item--underline">
              horizontally
            </span>
            , or{" "}
            <span className="TTTInformationModal-list__item--underline">
              diagonally
            </span>
            .
          </p>
          <p className="TTTInformationModal-list__item">
            Or the 9-square grid is full.
          </p>
        </div>
        <div className="modal-footer TTTInformationModal-footer">
          <Button
            onClick={() =>
              window.open("https://www.wikihow.com/Play-Tic-Tac-Toe")
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

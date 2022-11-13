import "./Footer.scss";
import PropTypes from "prop-types";
import DarkMode from "../../assets/svgs/DarkMode";
import LinkSvg from "../../assets/svgs/Link";

const Footer = ({ setShowModal }) => {
  return (
    <footer>
      <LinkSvg setShowModal={setShowModal} />
      <DarkMode />
    </footer>
  );
};
Footer.prototype = {
  setShowModal: PropTypes.func.isRequired,
};
export default Footer;

import "./Header.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

const Header = () => {
  return (
    <div className="header">
      <Link className="header__container" to={"/"}>
        <img src={Logo} alt="logo" className="header__logo" />
        GameStation
      </Link>
    </div>
  );
};

export default Header;

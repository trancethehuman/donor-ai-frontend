import logo from "../images/EmailBlendLogo.svg";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-navbar">
      <img
        className="landing-navbar-logo"
        src={logo}
        width="170"
        onClick={() => navigate("/")}
      />
      <nav>
        <ul>
          <li>
            <a className="nav-bar-menu-item" onClick={() => navigate("/about")}>
              About
            </a>
          </li>
          <li>
            <a
              className="nav-bar-menu-item"
              onClick={() => navigate("/pricing")}
            >
              Pricing
            </a>
          </li>
          <li>
            <a className="nav-bar-menu-item" href="#">
              Login
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;

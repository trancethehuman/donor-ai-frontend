import logo from "../images/EmailBlendLogo.svg";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";
import About from "./About";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-navbar">
      <img src={logo} width="170" />
      <nav>
        <ul>
          <li>
            <a className="nav-bar-menu-item" onClick={() => navigate("/about")}>
              About
            </a>
          </li>
          <li>
            <a className="nav-bar-menu-item" href="#">
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

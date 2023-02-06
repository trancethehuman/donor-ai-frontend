import { useNavigate } from "react-router-dom";
import { Button } from "@fluentui/react-components";
import steveJPG from "./images/steve.jpg";

import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  // use useNavigate and navigate() to make sure we go to link no matter where on the button surface we clicked.
  function handleClick(path) {
    navigate(path);
  }

  return (
    <div className="home-links-area">
      <h1 className="header">AI-Assisted</h1>
      <h1 className="header">Donation Solicitation</h1>
      <br></br>
      <img src={steveJPG} />
      <br></br>
      <br></br>
      <div className="home-link-button">
        <Button
          size="large"
          appearance="primary"
          onClick={() => navigate("/individual-campaign")}
        >
          Individual Donors Campaign
        </Button>
      </div>

      <div className="home-link-button">
        <Button
          size="large"
          appearance="primary"
          onClick={() => navigate("/class-campaign")}
        >
          Class-wide Campaign
        </Button>
      </div>
    </div>
  );
};

export default Home;

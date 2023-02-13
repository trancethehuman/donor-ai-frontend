import { useNavigate } from "react-router-dom";
import { Button } from "@fluentui/react-components";
import steveJPG from "./images/steve.jpg";

import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-links-area">
      <h1 className="header">AI-Assisted</h1>
      <h1 className="header">Solicitation Ghostwriter</h1>
      <h2>For Denison's Annual Fund</h2>
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
      <div className="home-link-button">
        <Button
          size="large"
          appearance="primary"
          onClick={() => navigate("/merge-fields")}
        >
          Generate AI content by Merge Fields
        </Button>
      </div>
    </div>
  );
};

export default Home;

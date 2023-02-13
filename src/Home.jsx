import { useNavigate } from "react-router-dom";
import { Button } from "@fluentui/react-components";
import steveJPG from "./images/steve.jpg";

import "./Home.css";
import { DenisonLogo } from "./Logos";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-links-area">
      <DenisonLogo width="300" />
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
          onClick={() => navigate("/merge-fields")}
        >
          AI Merge Fields
        </Button>
      </div>
      <div className="home-link-button">
        <Button
          size="large"
          appearance="primary"
          onClick={() => navigate("/ghostwriter")}
        >
          Ghostwriter
        </Button>
      </div>
    </div>
  );
};

export default Home;

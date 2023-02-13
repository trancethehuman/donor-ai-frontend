import { useNavigate } from "react-router-dom";
import { Button } from "@fluentui/react-components";

import "./Home.css";
import { DenisonLogoWithSubtitle } from "./Logos";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="home-links-area">
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
        <div className="home-link-button">
          <Button
            size="large"
            appearance="primary"
            onClick={() => navigate("/help")}
          >
            Help
          </Button>
        </div>
        <div className="home-link-button">
          <Button
            size="large"
            appearance="primary"
            onClick={() => navigate("/about")}
          >
            About
          </Button>
        </div>
      </div>
      <div className="branding">
        <DenisonLogoWithSubtitle />
      </div>
    </div>
  );
};

export default Home;

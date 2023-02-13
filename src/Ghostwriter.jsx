import { useNavigate } from "react-router-dom";
import { Button } from "@fluentui/react-components";

const Ghostwriter = () => {
  const navigate = useNavigate();

  return (
    <>
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
    </>
  );
};

export default Ghostwriter;

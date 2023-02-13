import { Button } from "@fluentui/react-components";
import "./MenuNavButton.css";
import { useNavigate } from "react-router-dom";

const MenuNavButton = ({
  route,
  label,
  appearance = "primary",
  isBackButton = false,
}) => {
  const navigate = useNavigate();

  return (
    <div className="menu-nav-button">
      <Button
        size="large"
        appearance={!isBackButton ? appearance : "secondary"}
        onClick={!isBackButton ? () => navigate(route) : () => navigate(-1)}
      >
        {!isBackButton ? label : "Back"}
      </Button>
    </div>
  );
};

export default MenuNavButton;

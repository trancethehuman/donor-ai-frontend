import { Button } from "@fluentui/react-components";
import "./MenuNavButton.css";
import { useNavigate } from "react-router-dom";

const MenuNavButton = ({ route, label, appearance = "primary" }) => {
  const navigate = useNavigate();

  return (
    <div className="menu-nav-button">
      <Button
        size="large"
        appearance={appearance}
        onClick={() => navigate(route)}
      >
        {label}
      </Button>
    </div>
  );
};

export default MenuNavButton;

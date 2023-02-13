import { useNavigate } from "react-router-dom";
import { Button } from "@fluentui/react-components";
import LeftSideBar from "./LeftSideBar";
import BackButton from "./BackButton";
import MenuNavButton from "./MenuNavButton";

const Ghostwriter = () => {
  const navigate = useNavigate();

  return (
    <LeftSideBar hasTopPadding>
      <MenuNavButton
        label="Individual Donors Campaign"
        route="individual-campaign"
      />
      <MenuNavButton label="Class-wide Campaign" route="class-campaign" />

      <BackButton />
    </LeftSideBar>
  );
};

export default Ghostwriter;

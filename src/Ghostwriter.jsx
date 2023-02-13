import LeftSidebar from "./LeftSidebar";
import MenuNavButton from "./MenuNavButton";

const Ghostwriter = () => {
  return (
    <LeftSidebar hasTopPadding>
      <MenuNavButton
        label="Individual Donors Campaign"
        route="/individual-campaign"
      />
      <MenuNavButton label="Class-wide Campaign" route="/class-campaign" />

      <MenuNavButton appearance="secondary" route="/" label="Return to Home" />
    </LeftSidebar>
  );
};

export default Ghostwriter;

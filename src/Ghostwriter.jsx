import LeftSideBar from "./LeftSideBar";
import MenuNavButton from "./MenuNavButton";

const Ghostwriter = () => {
  return (
    <LeftSideBar hasTopPadding>
      <MenuNavButton
        label="Individual Donors Campaign"
        route="/individual-campaign"
      />
      <MenuNavButton label="Class-wide Campaign" route="/class-campaign" />

      <MenuNavButton isBackButton />
    </LeftSideBar>
  );
};

export default Ghostwriter;

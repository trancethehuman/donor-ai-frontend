import LeftSidebar from "./LeftSidebar";
import MenuNavButton from "./MenuNavButton";

import "./Home.css";
import { DenisonLogoWithSubtitle } from "./Logos";

const Home = () => {
  return (
    <div className="container">
      <LeftSidebar hasTopPadding>
        <MenuNavButton label="AI Merge Fields" route="/merge-fields" />
        <MenuNavButton label="Ghostwriter" route="/ghostwriter" />
        <MenuNavButton label="Help" route="/help" />
        <MenuNavButton label="About" route="/about" />
      </LeftSidebar>
      <div className="branding">
        <DenisonLogoWithSubtitle />
        <br></br>
        <br></br>
        <br></br>
        <div className="home-tagline">
          <p>Increase alumni engagement through donation messaging</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

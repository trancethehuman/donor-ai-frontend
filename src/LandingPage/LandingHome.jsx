import NavBar from "./NavBar";
import "./LandingHome.css";

const LandingHome = () => {
  return (
    <>
      <NavBar />
      <div className="center-content-area">
        <div className="landing-home-tagline-area">
          <p className="landing-home-tagline">
            Add personal touches to email campaigns with AI
          </p>
        </div>
      </div>
    </>
  );
};

export default LandingHome;

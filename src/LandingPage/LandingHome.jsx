import NavBar from "./NavBar";
import "./LandingHome.css";
import YouTubeVideoFrame from "../YouTubeVideoFrame";
import MenuNavButton from "../MenuNavButton";

const LandingHome = () => {
  return (
    <div>
      <NavBar />
      <div className="landing-home-center-content-area">
        <p className="landing-home-tagline">
          Add personal touches
          <br />
          to your email campaigns
        </p>
        <p className="landing-home-subtitle">
          Write shockingly personal emails
          <br />
          no matter if you&apos;re writing to 100, 2000 or 500,000 people
        </p>

        <br />
        <div className="landing-home-center-button">
          <MenuNavButton label="Try Free Interactive Demo" route="demo" />
        </div>

        <br />
        {/* <div className="landing-home-center">
          <YouTubeVideoFrame
            className="landing-home-video"
            videoID={"HDjmDxb3Npo"}
          />
        </div> */}
      </div>
    </div>
  );
};

export default LandingHome;

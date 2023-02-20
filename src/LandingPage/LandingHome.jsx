import NavBar from "./NavBar";
import "./LandingHome.css";
import YouTubeVideoFrame from "../YouTubeVideoFrame";
import MenuNavButton from "../MenuNavButton";

const LandingHome = () => {
  return (
    <div>
      <NavBar />
      <div className="center-content-area">
        <div className="landing-home-tagline-area">
          <p className="landing-home-tagline">
            Add personal touches
            <br />
            to your email campaigns
          </p>
          <p className="landing-home-subtitle">
            Writed shockingly personal hooks in your email
            <br />
            no matter when you&apos;re writing to 100, 2000 or 500,000 people
          </p>
        </div>
        <br />
        <MenuNavButton label="Try Free Interactive Demo" />
        <br />
        <YouTubeVideoFrame
          className="landing-home-video"
          videoID={"HDjmDxb3Npo"}
        />
      </div>
    </div>
  );
};

export default LandingHome;

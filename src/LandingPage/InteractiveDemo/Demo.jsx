import NavBar from "../NavBar";
import "../LandingHome.css"; // This component actually uses CSS from the LandingHome.css
import SpreadsheetViewer from "../../SpreadsheetViewer";

const Demo = () => {
  return (
    <div>
      <NavBar />
      <div className="center-content-area">
        <div className="landing-home-tagline-area">
          <p className="landing-home-tagline">Interactive Demo</p>
          <br />
          <br />
          <p className="landing-home-subtitle">
            You&apos;re an e-commerce jewelry shop
            <br />
            called Whimsy Wears 💎
          </p>
          <br />
          <br />
          <br />
          <br />
          <p className="landing-home-subtitle">
            You have 10 customers and you want to send each
            <br />
            an email about a new product
          </p>
          <br />
          <br />
          <br />
          <br />
          <SpreadsheetViewer height="40rem" width="100%" />
        </div>
        <br />
      </div>
    </div>
  );
};

export default Demo;

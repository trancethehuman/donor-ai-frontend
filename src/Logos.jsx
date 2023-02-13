import denisonLogo from "./images/denison-logo.png";
import "./Logos.css";

export const DenisonLogo = ({ width = 50 }) => {
  return <img src={denisonLogo} width={width.toString()} />;
};

export const DenisonLogoWithSubtitle = ({ width = 250 }) => {
  return (
    <div className="logo-with-subtitle-area">
      <img src={denisonLogo} width={width.toString()} />
      <p className="logo-subtitle">Annual Fund AI Assistant</p>
    </div>
  );
};

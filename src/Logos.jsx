import denisonLogo from "./images/denison-logo.png";

export const DenisonLogo = ({ width = 50 }) => {
  return <img src={denisonLogo} width={width.toString()} />;
};

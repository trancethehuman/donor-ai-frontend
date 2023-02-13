import "./LeftSidebar.css";
import classNames from "classnames";

const LeftSideBar = ({ children, hasTopPadding = false }) => {
  const namesForClass = classNames("left-sidebar", {
    "has-top-padding": hasTopPadding,
  });

  return <div className={namesForClass}>{children}</div>;
};

export default LeftSideBar;

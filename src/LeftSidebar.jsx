import "./LeftSidebar.css";
import classNames from "classnames";

const LeftSidebar = ({ children, hasTopPadding = false }) => {
  const namesForClass = classNames("left-sidebar-wrapper", {
    "has-top-padding": hasTopPadding,
  });

  return (
    <div className={namesForClass}>
      <div className="left-sidebar">{children}</div>
    </div>
  );
};

export default LeftSidebar;

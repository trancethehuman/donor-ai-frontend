import { Button } from "@fluentui/react-components";
import { useRef } from "react";
import "./DonorCard.css";
const DonorCard = ({ name, year, major, home, messageSettings }) => {
  const editor = useRef();

  const onClickHandlerGenerateMessage = () => {};

  return (
    <div className="card">
      <h2>{name}</h2>
      <div className="sub-title-area">
        <span className="sub-title">'{year}</span>
        <span className="sub-title">{major} major</span>
        <span className="sub-title">{home}</span>
      </div>
      <textarea rows="5" cols="30" ref={editor} className="editor"></textarea>
      <div className="generate-button">
        <Button
          appearance="primary"
          size="large"
          onClick={onClickHandlerGenerateMessage}
        >
          Generate
        </Button>
      </div>
    </div>
  );
};

export default DonorCard;

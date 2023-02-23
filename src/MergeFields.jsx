import { useState } from "react";
import "./MergeFields.css";
import { useSpreadsheetData } from "./spreadsheetHooks";
import LeftSidebar from "./LeftSidebar";
import MenuNavButton from "./MenuNavButton";
import DragAndDropZone from "./DrapAndDropZone";

const MergeFields = () => {
  const [file, setFile] = useState();
  const sheetData = useSpreadsheetData(file);

  const fileUploadHandler = (uploadedFile) => {
    setFile(uploadedFile);
  };

  const fileUploadHandlerWithEvent = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  return (
    <div className="container">
      <LeftSidebar>
        <h1>Generate Content by Merge Fields</h1>
        <br></br>
        <MenuNavButton
          label="Return to Home"
          appearance="secondary"
          route="/"
        />
        <MenuNavButton isBackButton />
        <h2>General Settings</h2>
        <br></br>
        {file ? (
          <div>
            <p>Upload a new file here</p>
            <input type="file" onChange={fileUploadHandlerWithEvent} />
          </div>
        ) : null}
      </LeftSidebar>

      <div className="spreadsheet-area">
        <div className="uploader-area">
          {!file && <DragAndDropZone callback={fileUploadHandler} />}
        </div>

        {file &&
          {
            /* <SpreadsheetViewer height="80%" width="100%" data={sheetData} /> */
          }}
      </div>
    </div>
  );
};

export default MergeFields;

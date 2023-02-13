import { useState } from "react";
import SpreadsheetViewer from "./SpreadsheetViewer";
import "./MergeFields.css";
import { useSpreadsheetData } from "./spreadsheetHooks";
import LeftSidebar from "./LeftSidebar";
import MenuNavButton from "./MenuNavButton";

const MergeFields = () => {
  const [file, setFile] = useState();
  const sheetData = useSpreadsheetData(file);

  const fileUploadHandler = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  return (
    <div className="container">
      <LeftSidebar>
        <input type="file" onChange={fileUploadHandler} />
        <MenuNavButton isBackButton />
        <MenuNavButton
          label="Return to Home"
          appearance="secondary"
          route="/"
        />
      </LeftSidebar>

      <div className="spreadsheet-area">
        <SpreadsheetViewer height="80%" width="100%" data={sheetData} />
      </div>
    </div>
  );
};

export default MergeFields;

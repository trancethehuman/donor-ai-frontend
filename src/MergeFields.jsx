import { useState } from "react";
import SpreadsheetViewer from "./SpreadsheetViewer";
import "./MergeFields.css";
import { useSpreadsheetData } from "./spreadsheetHooks";

const MergeFields = () => {
  const [file, setFile] = useState();
  const sheetData = useSpreadsheetData(file);

  const fileUploadHandler = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  return (
    <div>
      <input type="file" onChange={fileUploadHandler} />
      <div className="Spreadsheet">
        <SpreadsheetViewer height="100%" data={sheetData} />
      </div>
    </div>
  );
};

export default MergeFields;

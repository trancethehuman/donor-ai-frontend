import XLSX from "xlsx";
import { useState, useEffect } from "react";
import SpreadsheetViewer from "./SpreadsheetViewer";
import "./MergeFields.css";
import { stox } from "./spreadsheetUtils";

const MergeFields = () => {
  const [sheetData, setSheetData] = useState();

  const fileToArrayBuffer = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data);
      const xSpreadsheetData = stox(workbook);

      setSheetData(xSpreadsheetData);
    };
    reader.readAsArrayBuffer(file);
  };

  const fileUploadHandler = (e) => {
    const uploadedFile = e.target.files[0];
    fileToArrayBuffer(uploadedFile);
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

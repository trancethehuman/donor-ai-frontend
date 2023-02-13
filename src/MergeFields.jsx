import XLSX from "xlsx";
import { useState, useEffect } from "react";
import SpreadsheetViewer from "./SpreadsheetViewer";
import "./MergeFields.css";

const MergeFields = () => {
  const [spreadsheetArray, setSpreadsheetArray] = useState();

  const fileToArrayBuffer = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet);
      const styles = [];
      const rowData = {};
      let rowIndex = 1;
      rows.forEach((row) => {
        const cellData = {};
        let cellIndex = 0;
        Object.keys(row).forEach((key) => {
          cellData[cellIndex++] = { text: row[key] };
        });
        rowData[rowIndex++] = { cells: cellData };
      });
      const cols = { len: Object.keys(rowData[1].cells).length };
      const parsedData = { styles, rows: rowData, cols };
      setSpreadsheetArray(parsedData);
    };
    reader.readAsArrayBuffer(file);
  };

  const fileUploadHandler = (e) => {
    const uploadedFile = e.target.files[0];
    fileToArrayBuffer(uploadedFile);
  };

  useEffect(() => {}, [spreadsheetArray]);

  return (
    <div>
      <input type="file" onChange={fileUploadHandler} />
      <div className="Spreadsheet">
        <SpreadsheetViewer height="80%" data={spreadsheetArray} />
      </div>
    </div>
  );
};

export default MergeFields;

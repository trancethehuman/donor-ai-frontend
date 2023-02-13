import { useState } from "react";

export const useSpreadsheetData = (file) => {
  const [data, setData] = useState();

  const reader = new FileReader();
  reader.onload = (e) => {
    const data = e.target.result;
    const workbook = XLSX.read(data);

    // SheetJS's workbook needs to be converted to compatible format for X-Spreadsheet (viewer)
    const xSpreadsheetCompatibleData = stox(workbook);

    setData(xSpreadsheetCompatibleData);
  };
  reader.readAsArrayBuffer(file);

  return data;
};

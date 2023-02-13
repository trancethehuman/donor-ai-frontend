import { useState, useEffect } from "react";
import XLSX from "xlsx";
import { stox } from "./spreadsheetUtils";

export const useSpreadsheetData = (file) => {
  const [data, setData] = useState();

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data);

        // SheetJS's workbook needs to be converted to compatible format for X-Spreadsheet (viewer)
        const xSpreadsheetCompatibleData = stox(workbook);

        setData(xSpreadsheetCompatibleData);
      };
      reader.readAsArrayBuffer(file);
    }
  }, [file]);

  return data;
};

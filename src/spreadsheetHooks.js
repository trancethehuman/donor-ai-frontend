import { useState, useEffect } from "react";
import XLSX from "xlsx";
import { stox } from "./spreadsheetUtils";

export const useSpreadsheetData = (input, isJSObject = false) => {
  const [data, setData] = useState();

  useEffect(() => {
    if (input) {
      if (isJSObject) {
        const sheet = XLSX.utils.json_to_sheet(input);
        const workbook = XLSX.utils.book_new();

        // Whenever parsing a JS objects array, the data will be presented in one sheet called "Sheet1"
        XLSX.utils.book_append_sheet(workbook, sheet, "Sheet1");

        // SheetJS's workbook needs to be converted to compatible format for X-Spreadsheet (viewer)
        const xSpreadsheetCompatibleData = stox(workbook);

        setData(xSpreadsheetCompatibleData);
      } else {
        const reader = new inputReader();

        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data);

          // SheetJS's workbook needs to be converted to compatible format for X-Spreadsheet (viewer)
          const xSpreadsheetCompatibleData = stox(workbook);

          setData(xSpreadsheetCompatibleData);
        };
        reader.readAsArrayBuffer(input);
      }
    }
  }, [input, isJSObject]);

  return data;
};

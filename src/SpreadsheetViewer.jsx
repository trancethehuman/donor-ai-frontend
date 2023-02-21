import Spreadsheet from "x-data-spreadsheet";
import { useRef, useState, useEffect } from "react";
import "./SpreadsheetViewer.css";

// To find out which options can be passed in, go to https://github.com/myliang/x-spreadsheet#npm
const SpreadsheetViewer = ({ data = {}, height, width, options }) => {
  const spreadsheetHTML = useRef();
  const sheetObject = useRef();
  const [uploadedSheetData, setUploadedSheetData] = useState(data);

  useEffect(() => {
    const element = spreadsheetHTML.current;
    const sheet = new Spreadsheet("#x-spreadsheet", {
      view: {
        height: () => document.documentElement.clientHeight,
        width: () => document.documentElement.clientWidth,
      },
      ...options,
    })
      .loadData(uploadedSheetData)
      .change((data) => console.log(data));

    sheetObject.current = sheet;

    return () => {
      element.innerHTML = "";
    };
  }, [options, uploadedSheetData]);

  useEffect(() => {
    setUploadedSheetData(data);
  }, [data]);

  useEffect(() => {
    sheetObject.current.change(() => {
      const newData = sheetObject.current.getData(); // ToDo: move this to export button
    });
  });

  return (
    <div className="x-spreadsheet-container">
      <div
        style={{
          height: height || "100%",
          width: width || "100%",
          overflow: "auto",
        }}
        id="x-spreadsheet"
        ref={spreadsheetHTML}
      />
    </div>
  );
};

export default SpreadsheetViewer;

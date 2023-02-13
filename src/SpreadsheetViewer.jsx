import Spreadsheet from "x-data-spreadsheet";
import { useRef, useState, useEffect } from "react";

const SpreadsheetViewer = ({ data = {}, height, options, width }) => {
  const spreadsheetHTML = useRef();
  const sheetObject = useRef();
  const [uploadedSheetData, setUploadedSheetData] = useState(data);

  useEffect(() => {
    const element = spreadsheetHTML.current;
    const sheet = new Spreadsheet("#x-spreadsheet", {
      view: {
        height: () =>
          (element && element.clientHeight) ||
          document.documentElement.clientHeight,
        width: () =>
          (element && element.clientWidth) ||
          document.documentElement.clientWidth,
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
      const newData = sheetObject.current.getData();
      console.log(newData);
    });
  });

  return (
    <div
      style={{ height: height || "100%", width: width || "100%" }}
      id="x-spreadsheet"
      ref={spreadsheetHTML}
    />
  );
};

export default SpreadsheetViewer;

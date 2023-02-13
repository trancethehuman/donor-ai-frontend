import Spreadsheet from "x-data-spreadsheet";
import { useRef, useState, useEffect } from "react";

const SpreadsheetViewer = ({ data = {}, height, options, width }) => {
  const sheetEl = useRef();
  const sheetRef = useRef();
  const [currentSheetData, setCurrentSheetData] = useState(data);

  useEffect(() => {
    const element = sheetEl.current;
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
    }).loadData(currentSheetData); // load data

    sheetRef.current = sheet;

    return () => {
      element.innerHTML = "";
    };
  }, [options, currentSheetData]);

  useEffect(() => {
    setCurrentSheetData(data);
  }, [data]);

  useEffect(() => {
    sheetRef.current.change((data) => {
      setCurrentSheetData(data);
    });
  });

  return (
    <div
      style={{ height: height || "100%", width: width || "100%" }}
      id="x-spreadsheet"
      ref={sheetEl}
    />
  );
};

export default SpreadsheetViewer;

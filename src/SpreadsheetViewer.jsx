import Spreadsheet from "x-data-spreadsheet";
import { useRef, useState, useEffect } from "react";
import "./SpreadsheetViewer.css";
import { getRandomLettersSequence } from "./LandingPage/utils";

// To find out which options can be passed in, go to https://github.com/myliang/x-spreadsheet#npm
const SpreadsheetViewer = ({
  data = {},
  height,
  width,
  options,
  getSheetDataOutTo = undefined,
}) => {
  const spreadsheetRandomId = useRef(getRandomLettersSequence()); // This needs to be random so the id of the spreadsheet div is unique for every instances of viewer
  const componentRef = useRef(null);
  const spreadsheetHTML = useRef();
  const sheetObject = useRef();
  const [uploadedSheetData, setUploadedSheetData] = useState(data);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          window.scrollTo(0, componentRef.current.offsetTop);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(componentRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const element = spreadsheetHTML.current;
    const sheet = new Spreadsheet("#" + spreadsheetRandomId.current, {
      view: {
        height: () => document.documentElement.clientHeight,
        width: () => document.documentElement.clientWidth,
      },
      ...options,
    }).loadData(uploadedSheetData);

    sheetObject.current = sheet;

    return () => {
      element.innerHTML = "";
    };
  }, [options, uploadedSheetData]);

  useEffect(() => {
    setUploadedSheetData(data);
  }, [data]);

  // Pass the current data on the sheet out to parent component
  useEffect(() => {
    sheetObject.current.change(() => {
      const newData = sheetObject.current.getData();
      if (getSheetDataOutTo) {
        getSheetDataOutTo(newData);
      }
    });
  }, [getSheetDataOutTo]);

  return (
    <div className="x-spreadsheet-container" ref={componentRef}>
      <div
        style={{
          height: height || "100%",
          width: width || "100%",
          overflow: "auto",
        }}
        id={spreadsheetRandomId.current}
        ref={spreadsheetHTML}
      />
    </div>
  );
};

export default SpreadsheetViewer;

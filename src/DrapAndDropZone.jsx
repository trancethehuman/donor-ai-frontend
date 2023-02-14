import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "0.5rem",
  borderWidth: 2.5,
  borderRadius: 1,
  borderColor: "#0F9D58",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#0F9D58",
  outline: "none",
  transition: "border .24s ease-in-out",
  width: "30rem",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const DragAndDropZone = ({ callback }) => {
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({ maxFiles: 1 });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  useEffect(() => {
    callback(acceptedFiles[0]);
  }, [acceptedFiles, callback]);

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Click here, or drag a spreadsheet in here</p>
      </div>
    </div>
  );
};

export default DragAndDropZone;

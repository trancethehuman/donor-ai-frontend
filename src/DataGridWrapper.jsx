import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const DataGridWrapper = ({ data }) => {
  const columnDefs = Object.keys(data[0]).map((key) => {
    return { field: key };
  });

  console.log(columnDefs);
  return (
    <div>
      <div
        className="ag-theme-alpine"
        style={{ height: "30rem", width: "50rem" }}
      >
        <AgGridReact rowData={data} columnDefs={columnDefs} />
      </div>
    </div>
  );
};

export default DataGridWrapper;

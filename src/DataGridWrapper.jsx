import { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const DataGridWrapper = ({ data, width, height, editable = false }) => {
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState();
  const [defaultColDef, setDefaultColDef] = useState();

  useEffect(() => {
    setRowData(data);
    setColumnDefs(
      Object.keys(data[0]).map((key) => {
        return { field: key };
      })
    );
    setDefaultColDef({
      editable: editable,
    });
  }, [data, editable]);

  return (
    <div>
      <div
        className="ag-theme-alpine"
        style={{ height: "30rem", width: "50rem" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
        />
      </div>
    </div>
  );
};

export default DataGridWrapper;

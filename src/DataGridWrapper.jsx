import { useState, useEffect, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const DataGridWrapper = ({
  data,
  width,
  height,
  editable = false,
  getCurrentDataCallback = undefined,
}) => {
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState();
  const [defaultColDef, setDefaultColDef] = useState();

  const gridRef = useRef();

  useEffect(() => {
    // These two only keeps track of displaying current data on the grid
    setRowData(data);
    setColumnDefs(
      Object.keys(data[0]).map((key) => {
        return { field: key };
      })
    );

    setDefaultColDef({
      editable: editable,
    });

    if (getCurrentDataCallback) {
      getCurrentDataCallback(rowData);
    }
  }, [data, editable, getCurrentDataCallback, rowData]);

  const onCellValueChanged = useCallback(
    (event) => {
      const currentNodes = gridRef.current.api.forEachNode((node) => node);

      if (getCurrentDataCallback) {
        getCurrentDataCallback(currentNodes);
      }
    },
    [getCurrentDataCallback]
  );

  return (
    <div>
      <div
        className="ag-theme-alpine"
        style={{ height: height || "30rem", width: width || "50rem" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onCellValueChanged={onCellValueChanged}
        />
      </div>
    </div>
  );
};

export default DataGridWrapper;

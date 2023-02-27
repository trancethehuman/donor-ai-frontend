import { useState, useEffect, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const DataGridWrapper = ({
  data = [{ id: "", value: "" }],
  width,
  height,
  editable = false,
  getCurrentDataCallback = undefined,
  fitAllColumnsIntoViewOnLoad = false,
}) => {
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState();
  const [defaultColDef, setDefaultColDef] = useState();

  const gridRef = useRef();

  const sizeToFit = useCallback(() => {
    gridRef.current.api.sizeColumnsToFit({
      defaultMinWidth: 100,
    });
  }, []);

  const autoSizeAll = useCallback((skipHeader) => {
    const allColumnIds = [];
    gridRef.current.columnApi.getColumns().forEach((column) => {
      allColumnIds.push(column.getId());
    });
    gridRef.current.columnApi.autoSizeColumns(allColumnIds, skipHeader);
  }, []);

  // When the grid view is loaded, do all these
  const onGridReady = () => {
    if (fitAllColumnsIntoViewOnLoad) {
      sizeToFit();
    }
  };

  const onCellValueChanged = useCallback(
    (event) => {
      const currentNodes = gridRef.current.api.forEachNode((node) => node);

      if (getCurrentDataCallback) {
        getCurrentDataCallback(currentNodes);
      }
    },
    [getCurrentDataCallback]
  );

  useEffect(() => {
    // These two only helps the grid display data, not keeping track of up-to-date data.
    setRowData(data);
    setColumnDefs(
      Object.keys(data[0]).map((key) => {
        return { field: key };
      })
    );

    setDefaultColDef({
      editable: editable,
      resizable: true,
    });

    // This actually exposes the grid data out (including edits)
    if (getCurrentDataCallback) {
      getCurrentDataCallback(rowData);
    }
  }, [data, editable, getCurrentDataCallback, rowData, sizeToFit]);

  return (
    <div>
      <div
        className="ag-theme-alpine"
        style={{ height: height || "32rem", width: width || "50rem" }}
      >
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onCellValueChanged={onCellValueChanged}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
};

export default DataGridWrapper;

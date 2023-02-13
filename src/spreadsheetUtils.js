import XLSX from "xlsx";

/**
 * Converts a SheetJS Workbook to X-Spreadsheet compatible data. Demo at: https://docs.sheetjs.com/xspreadsheet/
 * @param wb - The workbook object
 * @returns An array of objects. Each object represents a sheet in the workbook.
 */
export const stox = (wb) => {
  var out = [];
  wb.SheetNames.forEach(function (name) {
    var o = { name: name, rows: {} };
    var ws = wb.Sheets[name];
    if (!ws || !ws["!ref"]) return;
    var range = XLSX.utils.decode_range(ws["!ref"]);
    // sheet_to_json will lose empty row and col at begin as default
    range.s = { r: 0, c: 0 };
    var aoa = XLSX.utils.sheet_to_json(ws, {
      raw: false,
      header: 1,
      range: range,
    });

    aoa.forEach(function (r, i) {
      var cells = {};
      r.forEach(function (c, j) {
        cells[j] = { text: c };

        var cellRef = XLSX.utils.encode_cell({ r: i, c: j });

        if (ws[cellRef] != null && ws[cellRef].f != null) {
          cells[j].text = "=" + ws[cellRef].f;
        }
      });
      o.rows[i] = { cells: cells };
    });

    o.merges = [];
    (ws["!merges"] || []).forEach(function (merge, i) {
      //Needed to support merged cells with empty content
      if (o.rows[merge.s.r] == null) {
        o.rows[merge.s.r] = { cells: {} };
      }
      if (o.rows[merge.s.r].cells[merge.s.c] == null) {
        o.rows[merge.s.r].cells[merge.s.c] = {};
      }

      o.rows[merge.s.r].cells[merge.s.c].merge = [
        merge.e.r - merge.s.r,
        merge.e.c - merge.s.c,
      ];

      o.merges[i] = XLSX.utils.encode_range(merge);
    });

    out.push(o);
  });

  return out;
};

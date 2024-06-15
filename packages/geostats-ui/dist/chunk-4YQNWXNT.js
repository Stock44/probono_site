import {
  TableCheckboxCell
} from "./chunk-T4EAR254.js";
import {
  TableColumnHeader
} from "./chunk-P4K5DSRK.js";
import {
  TableHeaderRow
} from "./chunk-E2RS2WK2.js";
import {
  TableRowGroup
} from "./chunk-6DORXOGE.js";
import {
  TableRow
} from "./chunk-RMBLNDJT.js";
import {
  TableSelectAllCell
} from "./chunk-DQHOOFH4.js";
import {
  TableCell
} from "./chunk-3I3WHWOK.js";
import {
  cx
} from "./chunk-2BW276DM.js";

// src/table/table.tsx
import { useRef } from "react";
import { useTable } from "react-aria";
import { useTableState } from "react-stately";
import { jsx, jsxs } from "react/jsx-runtime";
function Table(props) {
  const { className } = props;
  const state = useTableState(props);
  const tableRef = useRef(null);
  const { collection } = state;
  const { gridProps } = useTable(props, state, tableRef);
  return /* @__PURE__ */ jsxs(
    "table",
    {
      ...gridProps,
      ref: tableRef,
      className: cx("border-collapse", className),
      children: [
        /* @__PURE__ */ jsx(TableRowGroup, { type: "thead", children: collection.headerRows.map((headerRow) => /* @__PURE__ */ jsx(
          TableHeaderRow,
          {
            item: headerRow,
            state,
            children: [...collection.getChildren(headerRow.key)].map(
              (column) => column.props.isSelectionCell ? /* @__PURE__ */ jsx(
                TableSelectAllCell,
                {
                  column,
                  state
                },
                column.key
              ) : /* @__PURE__ */ jsx(
                TableColumnHeader,
                {
                  column,
                  state
                },
                column.key
              )
            )
          },
          headerRow.key
        )) }),
        /* @__PURE__ */ jsx(TableRowGroup, {
          type: "tbody",
          // The following is deprecated, but the body's children are not accesible via collection.getChildren
          children: [...collection.body.childNodes].map((row) => /* @__PURE__ */ jsx(TableRow, { item: row, state, children: [...collection.getChildren(row.key)].map(
            (cell) => cell.props.isSelectionCell ? /* @__PURE__ */ jsx(
              TableCheckboxCell,
              {
                cell,
                state
              },
              cell.key
            ) : /* @__PURE__ */ jsx(
              TableCell,
              {
                cell,
                state
              },
              cell.key
            )
          ) }, row.key))
        })
      ]
    }
  );
}

export {
  Table
};
//# sourceMappingURL=chunk-4YQNWXNT.js.map
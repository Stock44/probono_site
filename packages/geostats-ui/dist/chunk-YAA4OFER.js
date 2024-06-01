import {
  Checkbox
} from "./chunk-GHV6P5MD.js";

// src/table/table-checkbox-cell.tsx
import { useRef } from "react";
import { useTableCell, useTableSelectionCheckbox } from "react-aria";
import { jsx } from "react/jsx-runtime";
function TableCheckboxCell(props) {
  const { cell, state } = props;
  const cellRef = useRef(null);
  const { gridCellProps } = useTableCell({ node: cell }, state, cellRef);
  const { checkboxProps } = useTableSelectionCheckbox(
    {
      key: cell.parentKey
    },
    state
  );
  return /* @__PURE__ */ jsx(
    "td",
    {
      ...gridCellProps,
      ref: cellRef,
      className: "border-y border-stone-800 px-4",
      children: /* @__PURE__ */ jsx(Checkbox, { ...checkboxProps })
    }
  );
}

export {
  TableCheckboxCell
};
//# sourceMappingURL=chunk-YAA4OFER.js.map
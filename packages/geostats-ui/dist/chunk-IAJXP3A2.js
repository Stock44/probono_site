import {
  Checkbox
} from "./chunk-GHV6P5MD.js";

// src/table/table-select-all-cell.tsx
import { useRef } from "react";
import {
  useTableColumnHeader,
  useTableSelectAllCheckbox,
  VisuallyHidden
} from "react-aria";
import { jsx } from "react/jsx-runtime";
function TableSelectAllCell(props) {
  const { column, state } = props;
  const cellRef = useRef(null);
  const { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    cellRef
  );
  const { checkboxProps } = useTableSelectAllCheckbox(state);
  return /* @__PURE__ */ jsx("th", { ...columnHeaderProps, ref: cellRef, className: "px-4", children: state.selectionManager.selectionMode === "single" ? /* @__PURE__ */ jsx(VisuallyHidden, { children: checkboxProps["aria-label"] }) : /* @__PURE__ */ jsx(Checkbox, { ...checkboxProps }) });
}

export {
  TableSelectAllCell
};
//# sourceMappingURL=chunk-IAJXP3A2.js.map
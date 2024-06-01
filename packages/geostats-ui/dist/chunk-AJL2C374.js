import {
  cx
} from "./chunk-JO3XUUYI.js";

// src/table/table-cell.tsx
import { useRef } from "react";
import { mergeProps, useFocusRing, useTableCell } from "react-aria";
import { jsx } from "react/jsx-runtime";
function TableCell(props) {
  const { cell, state } = props;
  const cellRef = useRef(null);
  const { gridCellProps } = useTableCell({ node: cell }, state, cellRef);
  const { isFocusVisible, focusProps } = useFocusRing();
  return /* @__PURE__ */ jsx(
    "td",
    {
      ...mergeProps(gridCellProps, focusProps),
      ref: cellRef,
      className: cx(
        "p-4 outline-none border-y border-stone-800",
        isFocusVisible && "shadow-stone-500"
      ),
      children: cell.rendered
    }
  );
}

export {
  TableCell
};
//# sourceMappingURL=chunk-AJL2C374.js.map
import {
  cx
} from "./chunk-JO3XUUYI.js";

// src/table/table-row.tsx
import { useRef } from "react";
import { useTableRow } from "react-aria";
import { jsx } from "react/jsx-runtime";
function TableRow(props) {
  const { item, children, state } = props;
  const rowRef = useRef(null);
  const isSelected = state.selectionManager.isSelected(item.key);
  const { rowProps } = useTableRow({ node: item }, state, rowRef);
  return /* @__PURE__ */ jsx(
    "tr",
    {
      ...rowProps,
      ref: rowRef,
      className: cx(
        "outline-none cursor-default",
        isSelected && "text-stone-50 bg-stone-900"
      ),
      children
    }
  );
}

export {
  TableRow
};
//# sourceMappingURL=chunk-LUXYILD4.js.map
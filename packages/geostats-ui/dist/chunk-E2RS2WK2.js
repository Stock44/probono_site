// src/table/table-header-row.tsx
import { useRef } from "react";
import { useTableHeaderRow } from "react-aria";
import { jsx } from "react/jsx-runtime";
function TableHeaderRow(props) {
  const { item, state, children } = props;
  const headerRef = useRef(null);
  const { rowProps } = useTableHeaderRow({ node: item }, state, headerRef);
  return /* @__PURE__ */ jsx("tr", { ...rowProps, ref: headerRef, children });
}

export {
  TableHeaderRow
};
//# sourceMappingURL=chunk-E2RS2WK2.js.map
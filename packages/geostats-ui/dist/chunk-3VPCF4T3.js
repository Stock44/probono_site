import {
  cx
} from "./chunk-JO3XUUYI.js";

// src/table/table-column-header.tsx
import { useRef } from "react";
import { mergeProps, useFocusRing, useTableColumnHeader } from "react-aria";
import { jsx, jsxs } from "react/jsx-runtime";
function TableColumnHeader(props) {
  const { column, state } = props;
  const headerRef = useRef(null);
  const { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    headerRef
  );
  const { isFocusVisible, focusProps } = useFocusRing();
  const arrowIcon = state.sortDescriptor?.direction === "ascending" ? "\u25B2" : "\u25BC";
  return /* @__PURE__ */ jsxs(
    "th",
    {
      ...mergeProps(columnHeaderProps, focusProps),
      ref: headerRef,
      colSpan: column.colspan,
      className: cx(
        "p-4 outline-none cursor-default",
        isFocusVisible && "shadow-stone-50",
        (column.colspan ?? 0) > 1 ? "text-center" : "text-left"
      ),
      children: [
        column.rendered,
        column.props.allowsSorting && /* @__PURE__ */ jsx(
          "span",
          {
            "aria-hidden": "true",
            className: cx(
              "px-0 py-1 ",
              state.sortDescriptor?.column === column.key ? "visible" : "hidden"
            ),
            children: arrowIcon
          }
        )
      ]
    }
  );
}

export {
  TableColumnHeader
};
//# sourceMappingURL=chunk-3VPCF4T3.js.map
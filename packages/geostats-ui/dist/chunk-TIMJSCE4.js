import {
  cx
} from "./chunk-JO3XUUYI.js";

// src/table/table-row-group.tsx
import { useTableRowGroup } from "react-aria";
import { jsx } from "react/jsx-runtime";
function TableRowGroup(props) {
  const { type: Element, children } = props;
  const { rowGroupProps } = useTableRowGroup();
  return /* @__PURE__ */ jsx(
    Element,
    {
      ...rowGroupProps,
      className: cx(
        Element === "thead" && "border-b border-stone-700 bg-stone-900"
      ),
      children
    }
  );
}

export {
  TableRowGroup
};
//# sourceMappingURL=chunk-TIMJSCE4.js.map
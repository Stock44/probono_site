import {
  Checkbox
} from "./chunk-YCYC65IN.js";
import {
  $df56164dff5785e2$export$4338b53315abf666
} from "./chunk-VPMSH5IA.js";
import {
  cx
} from "./chunk-2BW276DM.js";

// src/list.tsx
import { forwardRef } from "react";
import {
  useGridList,
  useGridListItem,
  useFocusRing,
  mergeProps,
  useGridListSelectionCheckbox
} from "react-aria";
import {
  useListState
} from "react-stately";
import { jsx, jsxs } from "react/jsx-runtime";
function List(props, ref) {
  const { className } = props;
  const state = useListState(props);
  const listRef = $df56164dff5785e2$export$4338b53315abf666(ref);
  const { gridProps } = useGridList(props, state, listRef);
  return /* @__PURE__ */ jsx(
    "ul",
    {
      ...gridProps,
      ref: listRef,
      className: cx(
        "border border-stone-700 divide-y divide-stone-700 rounded",
        className
      ),
      children: [...state.collection].map((item) => /* @__PURE__ */ jsx(ListItem, { item, state }, item.key))
    }
  );
}
var list_default = forwardRef(List);
function ListCheckbox(props) {
  const { state, item } = props;
  const { checkboxProps } = useGridListSelectionCheckbox(
    {
      key: item.key
    },
    state
  );
  return /* @__PURE__ */ jsx(Checkbox, { ...checkboxProps });
}
var ListItem = forwardRef(function ListItem2(props, ref) {
  const { item, state } = props;
  const itemRef = $df56164dff5785e2$export$4338b53315abf666(ref);
  const { rowProps, gridCellProps } = useGridListItem(
    { node: item },
    state,
    itemRef
  );
  const { focusProps } = useFocusRing();
  const selectable = state.selectionManager.selectionMode !== "none" && state.selectionManager.selectionBehavior === "toggle";
  return /* @__PURE__ */ jsx(
    "li",
    {
      ...mergeProps(rowProps, focusProps),
      ref: itemRef,
      className: cx("p-2", selectable && "cursor-pointer"),
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          ...gridCellProps,
          className: cx("text-stone-300 flex items-center gap-4"),
          children: [
            selectable && /* @__PURE__ */ jsx(ListCheckbox, { state, item }),
            item.rendered
          ]
        }
      )
    }
  );
});

export {
  list_default,
  ListItem
};
//# sourceMappingURL=chunk-BAI7P3OI.js.map
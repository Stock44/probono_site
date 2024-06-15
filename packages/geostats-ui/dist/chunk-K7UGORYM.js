import {
  button_default
} from "./chunk-MTK6JCQ6.js";

// src/tag-group.tsx
import { useRef } from "react";
import {
  useFocusRing,
  useTag,
  useTagGroup
} from "react-aria";
import { Set } from "immutable";
import { useListState } from "react-stately";
import Close from "@material-design-icons/svg/round/close.svg";
import { jsx, jsxs } from "react/jsx-runtime";
function TagGroup(props) {
  const { className, label, description, errorMessage, onRemove } = props;
  const divRef = useRef(null);
  const state = useListState(props);
  const { gridProps, labelProps, descriptionProps, errorMessageProps } = useTagGroup(
    {
      ...props,
      onRemove: onRemove === void 0 ? void 0 : (keys) => {
        onRemove(Set(keys));
      }
    },
    state,
    divRef
  );
  return /* @__PURE__ */ jsxs("div", { className, children: [
    /* @__PURE__ */ jsx("div", { ...labelProps, className: "mb-1 text-sm text-stone-300", children: label }),
    /* @__PURE__ */ jsx("div", { ...gridProps, ref: divRef, className: "flex flex-wrap gap-2", children: [...state.collection].map((item) => /* @__PURE__ */ jsx(Tag, { item, state }, item.key)) }),
    description === void 0 ? null : /* @__PURE__ */ jsx("div", { ...descriptionProps, children: description }),
    errorMessage === void 0 ? null : /* @__PURE__ */ jsxs("div", { ...errorMessageProps, children: [
      " ",
      errorMessage,
      " "
    ] })
  ] });
}
function Tag(props) {
  const { item, state } = props;
  const ref = useRef(null);
  const { focusProps, isFocusVisible } = useFocusRing({
    within: true
  });
  const { rowProps, gridCellProps, removeButtonProps, allowsRemoving } = useTag(
    props,
    state,
    ref
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      ...rowProps,
      ...focusProps,
      "data-focus-visible": isFocusVisible,
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          ...gridCellProps,
          className: "flex items-center gap-2 rounded border border-stone-700 px-2 text-stone-300",
          children: [
            item.rendered,
            allowsRemoving && /* @__PURE__ */ jsx(button_default, { ...removeButtonProps, variant: "text", size: "sm", children: /* @__PURE__ */ jsx(Close, { className: "fill-current" }) })
          ]
        }
      )
    }
  );
}

export {
  TagGroup
};
//# sourceMappingURL=chunk-K7UGORYM.js.map
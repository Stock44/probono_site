import {
  button_default
} from "./chunk-NCCLLHSG.js";
import {
  cx
} from "./chunk-2BW276DM.js";

// src/search-field.tsx
import { useRef } from "react";
import { useSearchField } from "react-aria";
import {
  useSearchFieldState
} from "react-stately";
import Search from "@material-design-icons/svg/round/search.svg";
import Close from "@material-design-icons/svg/round/close.svg";
import { jsx, jsxs } from "react/jsx-runtime";
function SearchField(props) {
  const { label, className } = props;
  const state = useSearchFieldState(props);
  const inputRef = useRef(null);
  const { labelProps, inputProps, clearButtonProps } = useSearchField(
    props,
    state,
    inputRef
  );
  return /* @__PURE__ */ jsxs("div", { className: cx("group", className), children: [
    /* @__PURE__ */ jsx(
      "label",
      {
        ...labelProps,
        className: "text-stone-300 group-focus-within:text-stone-50",
        children: label
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 rounded border border-stone-700 px-1 group-focus-within:border-stone-50", children: [
      /* @__PURE__ */ jsx(Search, { className: "fill-stone-500 group-focus-within:fill-stone-50" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          ...inputProps,
          ref: inputRef,
          className: "grow bg-transparent py-1 text-stone-200 outline-none"
        }
      ),
      state.value === "" ? null : /* @__PURE__ */ jsx(button_default, { ...clearButtonProps, variant: "text", children: /* @__PURE__ */ jsx(Close, {}) })
    ] })
  ] });
}

export {
  SearchField
};
//# sourceMappingURL=chunk-NH2L64OM.js.map
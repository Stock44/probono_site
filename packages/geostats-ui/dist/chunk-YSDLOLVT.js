import {
  popover_default
} from "./chunk-KCDLBART.js";
import {
  BaseListBox
} from "./chunk-3TMD6P2R.js";
import {
  button_default
} from "./chunk-NCCLLHSG.js";
import {
  cx
} from "./chunk-2BW276DM.js";

// src/combo-box.tsx
import { useRef } from "react";
import { useComboBox } from "react-aria";
import {
  useComboBoxState
} from "react-stately";
import ArrowDropDown from "@material-design-icons/svg/round/arrow_drop_down.svg";
import { jsx, jsxs } from "react/jsx-runtime";
function ComboBox(props) {
  return "state" in props ? /* @__PURE__ */ jsx(BaseComboBox, { ...props }) : /* @__PURE__ */ jsx(StatefulComboBox, { ...props });
}
function StatefulComboBox(props) {
  const state = useComboBoxState(props);
  return /* @__PURE__ */ jsx(BaseComboBox, { ...props, state });
}
function BaseComboBox(props) {
  const { icon, state, className } = props;
  const buttonObjectRef = useRef(null);
  const inputObjectRef = useRef(null);
  const listBoxObjectRef = useRef(null);
  const popoverObjectRef = useRef(null);
  const { buttonProps, inputProps, listBoxProps, labelProps } = useComboBox(
    {
      ...props,
      inputRef: inputObjectRef,
      buttonRef: buttonObjectRef,
      listBoxRef: listBoxObjectRef,
      popoverRef: popoverObjectRef
    },
    state
  );
  return /* @__PURE__ */ jsxs("div", { className: cx("group w-fit", className), children: [
    /* @__PURE__ */ jsx(
      "label",
      {
        ...labelProps,
        className: "mb-1 text-sm text-stone-300 transition-colors group-focus-within:text-stone-50",
        children: props.label
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex w-full rounded border border-stone-700 bg-stone-950 text-stone-300 transition-all group-focus-within:border-stone-50 group-focus-within:shadow-stone-800 group-focus-within:glow-sm", children: [
      icon,
      /* @__PURE__ */ jsx(
        "input",
        {
          ...inputProps,
          ref: inputObjectRef,
          className: "grow bg-transparent p-1 outline-0 placeholder:text-stone-500"
        }
      ),
      /* @__PURE__ */ jsx(button_default, { ...buttonProps, ref: buttonObjectRef, variant: "text", children: /* @__PURE__ */ jsx(
        ArrowDropDown,
        {
          "aria-hidden": "true",
          className: "fill-current"
        }
      ) }),
      state.isOpen ? /* @__PURE__ */ jsx(
        popover_default,
        {
          ref: popoverObjectRef,
          state,
          triggerRef: inputObjectRef,
          placement: "bottom start",
          children: /* @__PURE__ */ jsx(
            BaseListBox,
            {
              ...listBoxProps,
              listBoxRef: listBoxObjectRef,
              state,
              className: "max-h-96"
            }
          )
        }
      ) : null
    ] })
  ] });
}

export {
  ComboBox,
  StatefulComboBox,
  BaseComboBox
};
//# sourceMappingURL=chunk-YSDLOLVT.js.map
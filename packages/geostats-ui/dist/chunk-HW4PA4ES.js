import {
  popover_default
} from "./chunk-KCDLBART.js";
import {
  ListBox
} from "./chunk-3TMD6P2R.js";
import {
  button_default
} from "./chunk-NCCLLHSG.js";
import {
  $df56164dff5785e2$export$4338b53315abf666
} from "./chunk-VPMSH5IA.js";
import {
  cx
} from "./chunk-2BW276DM.js";

// src/select.tsx
import { forwardRef } from "react";
import { useSelectState } from "react-stately";
import {
  useSelect,
  HiddenSelect
} from "react-aria";
import ArrowDropDown from "@material-design-icons/svg/round/arrow_drop_down.svg";
import { jsx, jsxs } from "react/jsx-runtime";
var Select = forwardRef(function Select2(props, ref) {
  const {
    className,
    label,
    isDisabled,
    name,
    placeholder,
    isRequired,
    popoverPlacement = "bottom start"
  } = props;
  const state = useSelectState({
    validationBehavior: "native",
    ...props
  });
  const { selectedItem, isFocused, isOpen } = state;
  const triggerRef = $df56164dff5785e2$export$4338b53315abf666(ref);
  const {
    labelProps,
    triggerProps,
    valueProps,
    menuProps,
    isInvalid,
    validationErrors,
    errorMessageProps
  } = useSelect(
    {
      validationBehavior: "native",
      ...props
    },
    state,
    triggerRef
  );
  return /* @__PURE__ */ jsxs("div", { className: cx("w-fit group", className), children: [
    label && /* @__PURE__ */ jsx(
      "div",
      {
        ...labelProps,
        "data-disabled": isDisabled,
        className: cx(
          "text-stone-400 text-sm mb-1 data-[disabled=true]:text-stone-500 transition-color",
          (isFocused || isOpen) && "text-stone-50",
          isRequired && 'after:content-["*"] after:ms-0.5'
        ),
        children: label
      }
    ),
    /* @__PURE__ */ jsx(
      HiddenSelect,
      {
        isDisabled,
        state,
        triggerRef,
        label,
        name
      }
    ),
    /* @__PURE__ */ jsxs(
      button_default,
      {
        ...triggerProps,
        ref: triggerRef,
        variant: "outlined",
        isDisabled,
        className: cx(
          "w-full flex group-focus-within:glow",
          isOpen && "glow-sm shadow-stone-800 border-stone-50"
        ),
        children: [
          /* @__PURE__ */ jsx("span", { ...valueProps, className: "grow text-left", children: selectedItem ? selectedItem.rendered : placeholder ?? "Selecciona una opci\xF3n" }),
          /* @__PURE__ */ jsx(ArrowDropDown, { "aria-hidden": "true", className: "fill-current" })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsx(
      popover_default,
      {
        state,
        triggerRef,
        placement: popoverPlacement,
        children: /* @__PURE__ */ jsx(
          ListBox,
          {
            ...menuProps,
            state,
            className: "max-h-96"
          }
        )
      }
    ),
    isInvalid && /* @__PURE__ */ jsx(
      "div",
      {
        ...errorMessageProps,
        className: "mt-1 text-xs text-red-400",
        children: validationErrors.join(" ")
      }
    )
  ] });
});
var select_default = Select;

export {
  select_default
};
//# sourceMappingURL=chunk-HW4PA4ES.js.map
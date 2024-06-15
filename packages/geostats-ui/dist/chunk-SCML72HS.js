import {
  button_default
} from "./chunk-NCCLLHSG.js";
import {
  $df56164dff5785e2$export$4338b53315abf666
} from "./chunk-VPMSH5IA.js";
import {
  cx
} from "./chunk-2BW276DM.js";

// src/number-field.tsx
import { forwardRef } from "react";
import { useLocale, useNumberField } from "react-aria";
import { useNumberFieldState } from "react-stately";
import { twJoin } from "tailwind-merge";
import ArrowDropDown from "@material-design-icons/svg/round/arrow_drop_down.svg";
import ArrowDropUp from "@material-design-icons/svg/round/arrow_drop_up.svg";
import { jsx, jsxs } from "react/jsx-runtime";
var NumberField = forwardRef(function NumberField2(props, ref) {
  const { locale } = useLocale();
  const { label, className, icon, isDisabled, name, isRequired } = props;
  const state = useNumberFieldState({
    validationBehavior: "native",
    ...props,
    locale
  });
  const inputRef = $df56164dff5785e2$export$4338b53315abf666(ref);
  const {
    labelProps,
    groupProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps,
    errorMessageProps,
    isInvalid,
    validationErrors
  } = useNumberField(
    {
      validationBehavior: "native",
      ...props
    },
    state,
    inputRef
  );
  return /* @__PURE__ */ jsxs("div", { "data-disabled": isDisabled, className: twJoin("group", className), children: [
    /* @__PURE__ */ jsx(
      "label",
      {
        ...labelProps,
        className: cx(
          "block text-stone-400 group-focus-within:text-stone-50 text-sm mb-1 group-data-[disabled=true]:text-stone-500 transition-colors",
          isRequired && 'after:content-["*"] after:ml-0.5'
        ),
        children: label
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ...groupProps,
        className: "flex w-full items-center gap-2 rounded border border-stone-700 ps-2 shadow-stone-800 transition-all group-focus-within:border-stone-50 group-focus-within:glow-sm group-data-[disabled=true]:border-stone-800",
        children: [
          icon,
          /* @__PURE__ */ jsx(
            "input",
            {
              ...inputProps,
              ref: inputRef,
              name,
              className: "min-w-0 grow bg-transparent py-2 text-stone-200 outline-none disabled:cursor-not-allowed disabled:text-stone-600"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex-none basis-4 flex-col items-center justify-around fill-stone-400", children: [
            /* @__PURE__ */ jsx(button_default, { ...incrementButtonProps, variant: "text", size: "xs", children: /* @__PURE__ */ jsx(ArrowDropUp, { viewBox: "0 0 24 24", className: "size-4" }) }),
            /* @__PURE__ */ jsx(button_default, { ...decrementButtonProps, variant: "text", size: "xs", children: /* @__PURE__ */ jsx(ArrowDropDown, { viewBox: "0 0 24 24", className: "size-4" }) })
          ] })
        ]
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

export {
  NumberField
};
//# sourceMappingURL=chunk-SCML72HS.js.map
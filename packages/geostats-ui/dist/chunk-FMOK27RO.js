import {
  $df56164dff5785e2$export$4338b53315abf666
} from "./chunk-VPMSH5IA.js";
import {
  cx
} from "./chunk-2BW276DM.js";

// src/text-field.tsx
import { forwardRef } from "react";
import { useTextField } from "react-aria";
import { jsx, jsxs } from "react/jsx-runtime";
var text_field_default = forwardRef(function TextField(props, ref) {
  const { label, isDisabled, className, description, icon, isRequired } = props;
  const inputRef = $df56164dff5785e2$export$4338b53315abf666(ref);
  const {
    labelProps,
    inputProps,
    descriptionProps,
    errorMessageProps,
    isInvalid,
    validationErrors
  } = useTextField(
    {
      validationBehavior: "native",
      ...props
    },
    inputRef
  );
  return /* @__PURE__ */ jsxs("div", { "data-disabled": isDisabled, className: cx("group", className), children: [
    label && /* @__PURE__ */ jsx(
      "label",
      {
        ...labelProps,
        className: cx(
          "text-stone-400 text-sm block mb-1 group-focus-within:text-stone-50 group-data-[disabled=true]:text-stone-500 transition-colors",
          isRequired && 'after:content-["*"] after:ml-0.5'
        ),
        children: label
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded border border-stone-700 px-2 shadow-stone-800 transition-all group-focus-within:border-stone-50 group-focus-within:glow-sm group-data-[disabled=true]:border-stone-800", children: [
      icon,
      /* @__PURE__ */ jsx(
        "input",
        {
          ...inputProps,
          ref: inputRef,
          className: "min-w-0 grow bg-transparent py-2 text-stone-100 outline-none placeholder:text-stone-500 disabled:cursor-not-allowed disabled:text-stone-600"
        }
      )
    ] }),
    description === void 0 ? null : /* @__PURE__ */ jsx("div", { ...descriptionProps, children: description }),
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
  text_field_default
};
//# sourceMappingURL=chunk-FMOK27RO.js.map
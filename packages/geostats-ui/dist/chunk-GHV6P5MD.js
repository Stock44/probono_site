import {
  cx
} from "./chunk-JO3XUUYI.js";

// src/checkbox.tsx
import { useRef } from "react";
import {
  mergeProps,
  useCheckbox,
  useFocusRing,
  usePress,
  VisuallyHidden
} from "react-aria";
import { useToggleState } from "react-stately";
import { jsx, jsxs } from "react/jsx-runtime";
function Checkbox(props) {
  const { children, className } = props;
  const ref = useRef(null);
  const state = useToggleState(props);
  const { inputProps } = useCheckbox(props, state, ref);
  const { focusProps } = useFocusRing();
  const { pressProps } = usePress({ isDisabled: props.isDisabled });
  return /* @__PURE__ */ jsxs("label", { className: cx("flex gap-2 text-stone-300", className), children: [
    /* @__PURE__ */ jsx(VisuallyHidden, { children: /* @__PURE__ */ jsx("input", { ...mergeProps(inputProps, focusProps), ref }) }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "size-6 cursor-pointer rounded border border-stone-700 p-1",
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsx(
          "svg",
          {
            ...pressProps,
            className: "fill-none stroke-stone-50 stroke-2",
            viewBox: "0 0 18 18",
            children: /* @__PURE__ */ jsx(
              "polyline",
              {
                className: "transition-all duration-200",
                points: "1 9 7 14 15 4",
                strokeDasharray: 24,
                strokeDashoffset: state.isSelected ? 48 : 72
              }
            )
          }
        )
      }
    ),
    children
  ] });
}

export {
  Checkbox
};
//# sourceMappingURL=chunk-GHV6P5MD.js.map
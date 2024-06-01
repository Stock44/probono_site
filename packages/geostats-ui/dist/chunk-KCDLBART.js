import {
  $df56164dff5785e2$export$4338b53315abf666
} from "./chunk-VPMSH5IA.js";

// src/popover.tsx
import { forwardRef } from "react";
import {
  DismissButton,
  Overlay,
  usePopover
} from "react-aria";
import { jsx, jsxs } from "react/jsx-runtime";
var Popover = forwardRef(function Popover2(props, ref) {
  const { children, state, offset = 8 } = props;
  const popoverRef = $df56164dff5785e2$export$4338b53315abf666(ref);
  const { popoverProps, underlayProps, arrowProps, placement } = usePopover(
    {
      ...props,
      offset,
      popoverRef
    },
    state
  );
  return /* @__PURE__ */ jsxs(Overlay, { children: [
    /* @__PURE__ */ jsx("div", { ...underlayProps, className: "fixed inset-0" }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        ...popoverProps,
        ref: popoverRef,
        className: "scroll-smooth rounded border border-stone-500 bg-stone-900 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-stone-50 scrollbar-thumb-rounded",
        children: [
          /* @__PURE__ */ jsx(
            "svg",
            {
              ...arrowProps,
              className: "absolute size-4 fill-stone-900 stroke-stone-500 stroke-[0.5px] data-[placement=bottom]:bottom-full\n					 data-[placement=left]:left-full\n					 data-[placement=right]:right-full data-[placement=top]:top-full data-[placement=bottom]:-translate-x-1/2\n					 data-[placement=bottom]:rotate-180 data-[placement=left]:-rotate-90\n					 data-[placement=right]:rotate-90",
              "data-placement": placement,
              viewBox: "0 0 12 12",
              children: /* @__PURE__ */ jsx("path", { d: "M0 0 L6 6 L12 0" })
            }
          ),
          /* @__PURE__ */ jsx(DismissButton, { onDismiss: state.close }),
          children,
          /* @__PURE__ */ jsx(DismissButton, { onDismiss: state.close })
        ]
      }
    )
  ] });
});
var popover_default = Popover;

export {
  popover_default
};
//# sourceMappingURL=chunk-KCDLBART.js.map
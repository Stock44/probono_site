// src/modal/modal.tsx
import React from "react";
import { Overlay, useModalOverlay } from "react-aria";
import { jsx } from "react/jsx-runtime";
function Modal(props) {
  const { state, children } = props;
  const ref = React.useRef(null);
  const { modalProps, underlayProps } = useModalOverlay(props, state, ref);
  return /* @__PURE__ */ jsx(Overlay, { children: /* @__PURE__ */ jsx(
    "div",
    {
      ...underlayProps,
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50",
      children: /* @__PURE__ */ jsx(
        "div",
        {
          ...modalProps,
          ref,
          className: "rounded border border-stone-800 bg-stone-950 p-4",
          children
        }
      )
    }
  ) });
}

export {
  Modal
};
//# sourceMappingURL=chunk-L5EMHVMM.js.map
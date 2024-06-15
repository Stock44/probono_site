// src/sidebar.tsx
import { useRef } from "react";
import { Overlay, useModalOverlay } from "react-aria";
import { motion } from "framer-motion";
import { jsx } from "react/jsx-runtime";
function Sidebar(props) {
  const { state, children } = props;
  const ref = useRef(null);
  const { modalProps, underlayProps } = useModalOverlay(props, state, ref);
  return /* @__PURE__ */ jsx(Overlay, { children: /* @__PURE__ */ jsx(
    motion.div,
    {
      className: "fixed inset-0 z-[1200] flex flex-row-reverse",
      animate: {
        background: "rgba(0,0,0,0.5)"
      },
      initial: {
        background: "rgba(0, 0, 0, 0)"
      },
      exit: {
        background: "rgba(0, 0, 0, 0)"
      },
      ...underlayProps,
      children: /* @__PURE__ */ jsx(
        motion.div,
        {
          ...modalProps,
          ref,
          animate: {
            right: 0
          },
          initial: {
            right: "-100%"
          },
          exit: {
            right: "-100%"
          },
          className: "relative border border-stone-800 bg-stone-950",
          children
        }
      )
    }
  ) });
}

export {
  Sidebar
};
//# sourceMappingURL=chunk-VUFQ3X6F.js.map
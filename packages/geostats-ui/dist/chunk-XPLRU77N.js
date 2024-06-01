import {
  Sidebar
} from "./chunk-VUFQ3X6F.js";
import {
  button_default
} from "./chunk-NCCLLHSG.js";

// src/sidebar-trigger.tsx
import React from "react";
import { useOverlayTriggerState } from "react-stately";
import { useOverlayTrigger } from "react-aria";
import { AnimatePresence } from "framer-motion";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function SidebarTrigger(props) {
  const { children, icon } = props;
  const state = useOverlayTriggerState(props);
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(button_default, { ...props, ...triggerProps, children: icon }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: state.isOpen && /* @__PURE__ */ jsx(Sidebar, { isDismissable: true, ...props, state, children: React.cloneElement(children, overlayProps) }) })
  ] });
}

export {
  SidebarTrigger
};
//# sourceMappingURL=chunk-XPLRU77N.js.map
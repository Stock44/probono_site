import {
  popover_default
} from "./chunk-KCDLBART.js";
import {
  button_default
} from "./chunk-NCCLLHSG.js";

// src/popover-button-trigger.tsx
import React from "react";
import { useOverlayTriggerState } from "react-stately";
import { mergeProps, useOverlayTrigger } from "react-aria";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function PopoverButtonTrigger(props) {
  const { label, children, placement } = props;
  const buttonRef = React.useRef(null);
  const state = useOverlayTriggerState(props);
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    buttonRef
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(button_default, { ...mergeProps(triggerProps, props), ref: buttonRef, children: label }),
    state.isOpen && /* @__PURE__ */ jsx(
      popover_default,
      {
        ...props,
        triggerRef: buttonRef,
        state,
        placement,
        children: React.cloneElement(children, overlayProps)
      }
    )
  ] });
}

export {
  PopoverButtonTrigger
};
//# sourceMappingURL=chunk-CINEP7QG.js.map
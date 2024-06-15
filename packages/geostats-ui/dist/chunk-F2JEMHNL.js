import {
  Modal
} from "./chunk-L5EMHVMM.js";
import {
  button_default
} from "./chunk-MTK6JCQ6.js";

// src/modal/modal-trigger.tsx
import React from "react";
import { useOverlayTriggerState } from "react-stately";
import { useOverlayTrigger } from "react-aria";

// src/modal/modal-context.ts
import { createContext, useContext } from "react";
var modalContext = createContext(null);

// src/modal/modal-trigger.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function ModalTrigger(props) {
  const { children, label, className } = props;
  const state = useOverlayTriggerState(props);
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: "dialog" },
    state
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(button_default, { ...props, ...triggerProps, className, children: label }),
    state.isOpen && /* @__PURE__ */ jsx(Modal, { state, children: React.cloneElement(
      /* @__PURE__ */ jsx(modalContext.Provider, { value: state.close, children }),
      overlayProps
    ) })
  ] });
}

export {
  ModalTrigger
};
//# sourceMappingURL=chunk-F2JEMHNL.js.map
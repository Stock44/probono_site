import {
  cx
} from "./chunk-2BW276DM.js";

// src/dialog.tsx
import { useRef } from "react";
import { useDialog } from "react-aria";
import { jsx, jsxs } from "react/jsx-runtime";
function Dialog(props) {
  const { title, children, className } = props;
  const ref = useRef(null);
  const { dialogProps, titleProps } = useDialog(props, ref);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...dialogProps,
      ref,
      className: cx("outline-none text-stone-300", className),
      children: [
        title === void 0 ? null : /* @__PURE__ */ jsx("h3", { ...titleProps, className: "mb-2 text-2xl font-bold", children: title }),
        children
      ]
    }
  );
}

export {
  Dialog
};
//# sourceMappingURL=chunk-QZGCNRQF.js.map
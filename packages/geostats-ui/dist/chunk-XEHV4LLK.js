import {
  require_react_dom
} from "./chunk-CDCF6ZMB.js";
import {
  LoadingSpinner
} from "./chunk-N5CYYREO.js";
import {
  button_default
} from "./chunk-MTK6JCQ6.js";
import {
  __toESM
} from "./chunk-BQWMX7FD.js";

// src/submit-button.tsx
var import_react_dom = __toESM(require_react_dom(), 1);
import { jsx, jsxs } from "react/jsx-runtime";
function SubmitButton(props) {
  const { isDisabled, children, icon, iconPlacement = "left" } = props;
  const { pending } = (0, import_react_dom.useFormStatus)();
  return /* @__PURE__ */ jsxs(button_default, { ...props, isDisabled: isDisabled ?? pending, type: "submit", children: [
    iconPlacement === "left" && (pending ? /* @__PURE__ */ jsx(LoadingSpinner, { className: "m-1" }) : icon),
    children,
    iconPlacement === "right" && (pending ? /* @__PURE__ */ jsx(LoadingSpinner, { className: "m-1" }) : icon)
  ] });
}

export {
  SubmitButton
};
//# sourceMappingURL=chunk-XEHV4LLK.js.map
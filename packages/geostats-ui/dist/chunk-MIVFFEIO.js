import {
  button_variants_default
} from "./chunk-3ED7USTZ.js";

// src/button/a-link-button.tsx
import { jsx } from "react/jsx-runtime";
function ALinkButton(props) {
  const { children } = props;
  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    /* @__PURE__ */ jsx("a", { rel: "noreferrer", ...props, className: button_variants_default(props), children })
  );
}

export {
  ALinkButton
};
//# sourceMappingURL=chunk-MIVFFEIO.js.map
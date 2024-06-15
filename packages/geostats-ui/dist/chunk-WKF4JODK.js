import {
  paper_variants_default
} from "./chunk-URFHZKAI.js";

// src/paper/paper.tsx
import { forwardRef } from "react";
import { omit } from "lodash";
import { jsx } from "react/jsx-runtime";
var Paper = (props, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ...omit(props, ["hoverEffect", "spacing"]),
    ref,
    className: paper_variants_default(props)
  }
);
var paper_default = forwardRef(Paper);

export {
  paper_default
};
//# sourceMappingURL=chunk-WKF4JODK.js.map
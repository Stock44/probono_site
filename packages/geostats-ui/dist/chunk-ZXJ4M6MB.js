import {
  cx
} from "./chunk-2BW276DM.js";

// src/loading-spinner.tsx
import { jsx } from "react/jsx-runtime";
function LoadingSpinner(props) {
  const { className } = props;
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className: cx("animate-spin w-4 h-4", className),
      viewBox: "0 0 50 50",
      children: /* @__PURE__ */ jsx(
        "circle",
        {
          className: "animate-spin-path stroke-current stroke-4",
          cx: "25",
          cy: "25",
          r: "20",
          fill: "none",
          strokeWidth: "5"
        }
      )
    }
  );
}

export {
  LoadingSpinner
};
//# sourceMappingURL=chunk-ZXJ4M6MB.js.map
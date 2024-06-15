import {
  cx
} from "./chunk-2BW276DM.js";

// src/separator.tsx
import {
  useSeparator
} from "react-aria";
import { jsx } from "react/jsx-runtime";
function Separator(props) {
  const { className, orientation = "horizontal" } = props;
  const { separatorProps } = useSeparator(props);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ...separatorProps,
      className: cx(
        "bg-stone-800",
        orientation === "horizontal" && "h-[1px] w-full my-8",
        orientation === "vertical" && "w-[1px] h-full mx-8",
        className
      )
    }
  );
}

export {
  Separator
};
//# sourceMappingURL=chunk-QUO4S6XI.js.map
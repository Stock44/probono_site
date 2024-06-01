import {
  cx
} from "./chunk-2BW276DM.js";

// src/dropdown.tsx
import { useState } from "react";
import ArrowDropDown from "@material-design-icons/svg/round/arrow_drop_down.svg";
import ArrowDropUp from "@material-design-icons/svg/round/arrow_drop_up.svg";
import { AnimatePresence, motion } from "framer-motion";
import { jsx, jsxs } from "react/jsx-runtime";
function Dropdown(props) {
  return "isOpen" in props ? /* @__PURE__ */ jsx(BaseDropdown, { ...props }) : /* @__PURE__ */ jsx(StatefulDropDown, { ...props });
}
function StatefulDropDown(props) {
  const { isInitiallyOpen = false } = props;
  const [isOpen, setIsOpen] = useState(isInitiallyOpen);
  return /* @__PURE__ */ jsx(BaseDropdown, { isOpen, onToggle: setIsOpen, ...props });
}
function BaseDropdown(props) {
  const { isOpen, onToggle, label, children, className } = props;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cx(
        "overflow-hidden rounded border border-stone-800",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex cursor-pointer border-b border-stone-800 p-2 font-bold text-stone-50 transition-colors hover:bg-stone-900",
            onClick: () => {
              onToggle(!isOpen);
            },
            children: [
              /* @__PURE__ */ jsx("div", { className: "grow", children: label }),
              isOpen ? /* @__PURE__ */ jsx(ArrowDropUp, { className: "fill-current" }) : /* @__PURE__ */ jsx(ArrowDropDown, { className: "fill-current" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsx(
          motion.div,
          {
            layout: true,
            className: "p-2 text-stone-300",
            initial: {
              height: 0
            },
            animate: {
              height: "auto"
            },
            exit: {
              height: 0
            },
            children
          }
        ) })
      ]
    }
  );
}

export {
  Dropdown,
  StatefulDropDown,
  BaseDropdown
};
//# sourceMappingURL=chunk-6WGIZIEO.js.map
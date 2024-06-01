// src/animated-layout-container.tsx
import { motion } from "framer-motion";
import { jsx } from "react/jsx-runtime";
function AnimatedLayoutContainer(props) {
  const { children, className } = props;
  return /* @__PURE__ */ jsx(motion.div, { layout: true, className, children });
}

export {
  AnimatedLayoutContainer
};
//# sourceMappingURL=chunk-PIDZVYSZ.js.map
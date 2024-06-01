import {
  button_default
} from "./chunk-NCCLLHSG.js";
import {
  cx
} from "./chunk-2BW276DM.js";

// src/toast.tsx
import { createContext, useContext, useRef } from "react";
import { useToastState } from "@react-stately/toast";
import {
  useToast,
  useToastRegion
} from "@react-aria/toast";
import { AnimatePresence, motion } from "framer-motion";
import { omit } from "lodash";
import Close from "@material-design-icons/svg/round/close.svg";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var toastVariants = {
  entering: {
    opacity: 1,
    top: "auto",
    bottom: "auto",
    right: 0
  },
  initial: {
    opacity: 1,
    top: "auto",
    bottom: 128,
    right: 0
  },
  initialQueued: {
    opacity: 0,
    top: 256,
    right: 0,
    bottom: "auto"
  },
  exiting: {
    right: "-110%"
  }
};
function Toast(props) {
  const { state, toast } = props;
  const { animation, content } = toast;
  const { title, description, icon, variant = "success" } = content;
  const ref = useRef(null);
  const { toastProps, titleProps, descriptionProps, closeButtonProps } = useToast(props, state, ref);
  return /* @__PURE__ */ jsxs(
    motion.div,
    {
      ...omit(toastProps, [
        "onAnimationEnd",
        "onAnimationStart",
        "onDragStart",
        "onDragEnd",
        "onDrag"
      ]),
      ref,
      layout: true,
      initial: animation === "queued" ? "initialQueued" : "initial",
      animate: "entering",
      exit: "exiting",
      variants: toastVariants,
      className: cx(
        "rounded flex p-2 items-center gap-2 relative max-w-2xl",
        variant === "success" && "bg-green-400",
        variant === "error" && "bg-red-400",
        variant === "warn" && "bg-yellow-400"
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              ...titleProps,
              className: "flex gap-1 font-semibold text-stone-800",
              children: [
                icon,
                title
              ]
            }
          ),
          description && /* @__PURE__ */ jsx("div", { ...descriptionProps, className: "text-stone-700", children: description })
        ] }),
        !toast.timeout && /* @__PURE__ */ jsx(
          button_default,
          {
            ...closeButtonProps,
            variant: "text",
            size: "xs",
            className: cx(
              "text-stone-800",
              variant === "success" && "enabled:hover:bg-green-500",
              variant === "warn" && "enabled:hover:bg-yellow-500",
              variant === "error" && "enabled:hover:bg-red-500"
            ),
            children: /* @__PURE__ */ jsx(Close, { className: "fill-current" })
          }
        )
      ]
    }
  );
}
function ToastRegion(props) {
  const { state } = props;
  const ref = useRef(null);
  const { regionProps } = useToastRegion(props, state, ref);
  return /* @__PURE__ */ jsx(
    motion.div,
    {
      ...omit(regionProps, [
        "onAnimationEnd",
        "onAnimationStart",
        "onDragStart",
        "onDragEnd",
        "onDrag"
      ]),
      ref,
      layout: true,
      className: "fixed bottom-4 right-4 z-[1050] flex flex-col gap-4 outline-none",
      children: /* @__PURE__ */ jsx(AnimatePresence, { children: state.visibleToasts.map((toast) => /* @__PURE__ */ jsx(Toast, { toast, state }, toast.key)) })
    }
  );
}
var toastContext = createContext(null);
function useToasts() {
  const toasts = useContext(toastContext);
  if (toasts === null) {
    throw new Error("useToast must be called within a ToastProvider");
  }
  return toasts;
}
function ToastProvider(props) {
  const { children } = props;
  const state = useToastState({
    maxVisibleToasts: 5
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(toastContext.Provider, { value: state, children }),
    /* @__PURE__ */ jsx(ToastRegion, { ...props, state })
  ] });
}

export {
  useToasts,
  ToastProvider
};
//# sourceMappingURL=chunk-P6WNTMIX.js.map
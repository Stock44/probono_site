import {
  button_variants_default
} from "./chunk-3GWD7EPK.js";
import {
  $df56164dff5785e2$export$4338b53315abf666
} from "./chunk-VPMSH5IA.js";

// src/button/button.tsx
import { forwardRef } from "react";
import { useButton } from "react-aria";
import { jsx } from "react/jsx-runtime";
var Button = (props, ref) => {
  const { children } = props;
  const buttonRef = $df56164dff5785e2$export$4338b53315abf666(ref);
  const { buttonProps } = useButton(
    {
      ...props,
      // Workaround for react/react-aria #1513
      onPress(event) {
        if (event.pointerType === "mouse" || event.pointerType === "keyboard") {
          props.onPress?.(event);
          return;
        }
        setTimeout(() => {
          props.onPress?.(event);
        }, 1);
      }
    },
    buttonRef
  );
  return /* @__PURE__ */ jsx(
    "button",
    {
      ...buttonProps,
      ref: buttonRef,
      className: button_variants_default(props),
      children
    }
  );
};
var button_default = forwardRef(Button);

export {
  button_default
};
//# sourceMappingURL=chunk-MTK6JCQ6.js.map
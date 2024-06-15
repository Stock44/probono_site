import {
  require_react_dom
} from "./chunk-CDCF6ZMB.js";
import {
  useToasts
} from "./chunk-P6WNTMIX.js";
import {
  __toESM
} from "./chunk-BQWMX7FD.js";

// src/form/form-submit-listener.tsx
var import_react_dom = __toESM(require_react_dom(), 1);
import { useEffect } from "react";
function FormSubmitListener(props) {
  const { successToast, state } = props;
  const { pending } = (0, import_react_dom.useFormStatus)();
  const { add } = useToasts();
  useEffect(() => {
    if (state.success && !pending) {
      add(successToast, { timeout: 3e3 });
    }
  }, [state.success, pending]);
  return null;
}

export {
  FormSubmitListener
};
//# sourceMappingURL=chunk-6525LDJ5.js.map
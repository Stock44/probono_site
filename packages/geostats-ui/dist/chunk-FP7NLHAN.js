import {
  FormSubmitListener
} from "./chunk-6525LDJ5.js";
import {
  require_react_dom
} from "./chunk-CDCF6ZMB.js";
import {
  __toESM
} from "./chunk-BQWMX7FD.js";

// src/form/form.tsx
var import_react_dom = __toESM(require_react_dom(), 1);
import { useMemo } from "react";
import { FormValidationContext } from "react-stately";
import { Seq } from "immutable";
import { jsx, jsxs } from "react/jsx-runtime";
function processStaticValues(staticValues) {
  if (staticValues === void 0) {
    return [];
  }
  return Seq(Object.entries(staticValues)).filter(([, value]) => value !== void 0).map(([key, value]) => {
    if (typeof value === "boolean") {
      return [key, value ? "true" : ""];
    }
    if (value instanceof Date) {
      return [key, value.toString()];
    }
    if (typeof value === "object") {
      return [key, JSON.stringify(value)];
    }
    if (typeof value === "string" || typeof value === "number") {
      return [key, value];
    }
    throw new Error("failed to process static values for form");
  }).toArray();
}
function Form(props) {
  const { children, action, staticValues, successToast, className } = props;
  const [state, formAction] = (0, import_react_dom.useFormState)(action, {
    success: false,
    formErrors: [],
    fieldErrors: {}
  });
  const { formErrors, fieldErrors } = state;
  const processedStaticValues = useMemo(
    () => processStaticValues(staticValues),
    [staticValues]
  );
  return /* @__PURE__ */ jsxs("form", { action: formAction, className, children: [
    processedStaticValues.map(([key, value]) => /* @__PURE__ */ jsx("input", { readOnly: true, hidden: true, name: key, value }, key)),
    formErrors.length > 0 && /* @__PURE__ */ jsx("div", { className: "mb-4 rounded bg-red-400 p-4 text-stone-50", children: formErrors.join(" ") }),
    successToast && /* @__PURE__ */ jsx(FormSubmitListener, { state, successToast }),
    /* @__PURE__ */ jsx(
      FormValidationContext.Provider,
      {
        value: fieldErrors,
        children
      }
    )
  ] });
}

export {
  Form
};
//# sourceMappingURL=chunk-FP7NLHAN.js.map
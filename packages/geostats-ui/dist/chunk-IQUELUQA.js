import {
  $431fbd86ca7dc216$export$b204af158042fbac,
  $431fbd86ca7dc216$export$f21a1ffae260145a,
  $6a7db85432448f7f$export$60278871457622de,
  $8ae05eaa5c114e9c$export$7f54fc3180508a52,
  $c87311424ea30a05$export$9ac100e40613ea10,
  $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c
} from "./chunk-VPMSH5IA.js";
import {
  cx
} from "./chunk-2BW276DM.js";

// src/file-drop-zone.tsx
import {
  useRef,
  useState
} from "react";
import { mergeProps, useDrop, useFocusRing } from "react-aria";

// ../../node_modules/@react-aria/form/dist/import.mjs
import { useEffect as $2tWuM$useEffect } from "react";

// ../../node_modules/@react-aria/interactions/dist/import.mjs
import $bx7SL$react, { useContext as $bx7SL$useContext, useState as $bx7SL$useState, useRef as $bx7SL$useRef, useMemo as $bx7SL$useMemo, useEffect as $bx7SL$useEffect, useCallback as $bx7SL$useCallback } from "react";
var $ae1eeba8b9eafd08$export$5165eccb35aaadb5 = (0, $bx7SL$react).createContext({
  register: () => {
  }
});
$ae1eeba8b9eafd08$export$5165eccb35aaadb5.displayName = "PressResponderContext";
var $f6c31cce2adf654f$var$LINK_CLICKED = Symbol("linkClicked");
var $507fabe10e71c6fb$var$currentModality = null;
var $507fabe10e71c6fb$var$changeHandlers = /* @__PURE__ */ new Set();
var $507fabe10e71c6fb$export$d90243b58daecda7 = /* @__PURE__ */ new Map();
var $507fabe10e71c6fb$var$hasEventBeforeFocus = false;
var $507fabe10e71c6fb$var$hasBlurredWindowRecently = false;
function $507fabe10e71c6fb$var$triggerChangeHandlers(modality, e) {
  for (let handler of $507fabe10e71c6fb$var$changeHandlers)
    handler(modality, e);
}
function $507fabe10e71c6fb$var$isValidKey(e) {
  return !(e.metaKey || !(0, $c87311424ea30a05$export$9ac100e40613ea10)() && e.altKey || e.ctrlKey || e.key === "Control" || e.key === "Shift" || e.key === "Meta");
}
function $507fabe10e71c6fb$var$handleKeyboardEvent(e) {
  $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
  if ($507fabe10e71c6fb$var$isValidKey(e)) {
    $507fabe10e71c6fb$var$currentModality = "keyboard";
    $507fabe10e71c6fb$var$triggerChangeHandlers("keyboard", e);
  }
}
function $507fabe10e71c6fb$var$handlePointerEvent(e) {
  $507fabe10e71c6fb$var$currentModality = "pointer";
  if (e.type === "mousedown" || e.type === "pointerdown") {
    $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
    $507fabe10e71c6fb$var$triggerChangeHandlers("pointer", e);
  }
}
function $507fabe10e71c6fb$var$handleClickEvent(e) {
  if ((0, $6a7db85432448f7f$export$60278871457622de)(e)) {
    $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
    $507fabe10e71c6fb$var$currentModality = "virtual";
  }
}
function $507fabe10e71c6fb$var$handleFocusEvent(e) {
  if (e.target === window || e.target === document)
    return;
  if (!$507fabe10e71c6fb$var$hasEventBeforeFocus && !$507fabe10e71c6fb$var$hasBlurredWindowRecently) {
    $507fabe10e71c6fb$var$currentModality = "virtual";
    $507fabe10e71c6fb$var$triggerChangeHandlers("virtual", e);
  }
  $507fabe10e71c6fb$var$hasEventBeforeFocus = false;
  $507fabe10e71c6fb$var$hasBlurredWindowRecently = false;
}
function $507fabe10e71c6fb$var$handleWindowBlur() {
  $507fabe10e71c6fb$var$hasEventBeforeFocus = false;
  $507fabe10e71c6fb$var$hasBlurredWindowRecently = true;
}
function $507fabe10e71c6fb$var$setupGlobalFocusEvents(element) {
  if (typeof window === "undefined" || $507fabe10e71c6fb$export$d90243b58daecda7.get((0, $431fbd86ca7dc216$export$f21a1ffae260145a)(element)))
    return;
  const windowObject = (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(element);
  const documentObject = (0, $431fbd86ca7dc216$export$b204af158042fbac)(element);
  let focus = windowObject.HTMLElement.prototype.focus;
  windowObject.HTMLElement.prototype.focus = function() {
    $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
    focus.apply(this, arguments);
  };
  documentObject.addEventListener("keydown", $507fabe10e71c6fb$var$handleKeyboardEvent, true);
  documentObject.addEventListener("keyup", $507fabe10e71c6fb$var$handleKeyboardEvent, true);
  documentObject.addEventListener("click", $507fabe10e71c6fb$var$handleClickEvent, true);
  windowObject.addEventListener("focus", $507fabe10e71c6fb$var$handleFocusEvent, true);
  windowObject.addEventListener("blur", $507fabe10e71c6fb$var$handleWindowBlur, false);
  if (typeof PointerEvent !== "undefined") {
    documentObject.addEventListener("pointerdown", $507fabe10e71c6fb$var$handlePointerEvent, true);
    documentObject.addEventListener("pointermove", $507fabe10e71c6fb$var$handlePointerEvent, true);
    documentObject.addEventListener("pointerup", $507fabe10e71c6fb$var$handlePointerEvent, true);
  } else {
    documentObject.addEventListener("mousedown", $507fabe10e71c6fb$var$handlePointerEvent, true);
    documentObject.addEventListener("mousemove", $507fabe10e71c6fb$var$handlePointerEvent, true);
    documentObject.addEventListener("mouseup", $507fabe10e71c6fb$var$handlePointerEvent, true);
  }
  windowObject.addEventListener("beforeunload", () => {
    $507fabe10e71c6fb$var$tearDownWindowFocusTracking(element);
  }, {
    once: true
  });
  $507fabe10e71c6fb$export$d90243b58daecda7.set(windowObject, {
    focus
  });
}
var $507fabe10e71c6fb$var$tearDownWindowFocusTracking = (element, loadListener) => {
  const windowObject = (0, $431fbd86ca7dc216$export$f21a1ffae260145a)(element);
  const documentObject = (0, $431fbd86ca7dc216$export$b204af158042fbac)(element);
  if (loadListener)
    documentObject.removeEventListener("DOMContentLoaded", loadListener);
  if (!$507fabe10e71c6fb$export$d90243b58daecda7.has(windowObject))
    return;
  windowObject.HTMLElement.prototype.focus = $507fabe10e71c6fb$export$d90243b58daecda7.get(windowObject).focus;
  documentObject.removeEventListener("keydown", $507fabe10e71c6fb$var$handleKeyboardEvent, true);
  documentObject.removeEventListener("keyup", $507fabe10e71c6fb$var$handleKeyboardEvent, true);
  documentObject.removeEventListener("click", $507fabe10e71c6fb$var$handleClickEvent, true);
  windowObject.removeEventListener("focus", $507fabe10e71c6fb$var$handleFocusEvent, true);
  windowObject.removeEventListener("blur", $507fabe10e71c6fb$var$handleWindowBlur, false);
  if (typeof PointerEvent !== "undefined") {
    documentObject.removeEventListener("pointerdown", $507fabe10e71c6fb$var$handlePointerEvent, true);
    documentObject.removeEventListener("pointermove", $507fabe10e71c6fb$var$handlePointerEvent, true);
    documentObject.removeEventListener("pointerup", $507fabe10e71c6fb$var$handlePointerEvent, true);
  } else {
    documentObject.removeEventListener("mousedown", $507fabe10e71c6fb$var$handlePointerEvent, true);
    documentObject.removeEventListener("mousemove", $507fabe10e71c6fb$var$handlePointerEvent, true);
    documentObject.removeEventListener("mouseup", $507fabe10e71c6fb$var$handlePointerEvent, true);
  }
  $507fabe10e71c6fb$export$d90243b58daecda7.delete(windowObject);
};
function $507fabe10e71c6fb$export$2f1888112f558a7d(element) {
  const documentObject = (0, $431fbd86ca7dc216$export$b204af158042fbac)(element);
  let loadListener;
  if (documentObject.readyState !== "loading")
    $507fabe10e71c6fb$var$setupGlobalFocusEvents(element);
  else {
    loadListener = () => {
      $507fabe10e71c6fb$var$setupGlobalFocusEvents(element);
    };
    documentObject.addEventListener("DOMContentLoaded", loadListener);
  }
  return () => $507fabe10e71c6fb$var$tearDownWindowFocusTracking(element, loadListener);
}
if (typeof document !== "undefined")
  $507fabe10e71c6fb$export$2f1888112f558a7d();
function $507fabe10e71c6fb$export$8397ddfc504fdb9a(modality) {
  $507fabe10e71c6fb$var$currentModality = modality;
  $507fabe10e71c6fb$var$triggerChangeHandlers(modality, null);
}

// ../../node_modules/@react-aria/form/dist/import.mjs
function $e93e671b31057976$export$b8473d3665f3a75a(props, state, ref) {
  let { validationBehavior, focus } = props;
  (0, $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c)(() => {
    if (validationBehavior === "native" && (ref === null || ref === void 0 ? void 0 : ref.current)) {
      let errorMessage = state.realtimeValidation.isInvalid ? state.realtimeValidation.validationErrors.join(" ") || "Invalid value." : "";
      ref.current.setCustomValidity(errorMessage);
      if (!ref.current.hasAttribute("title"))
        ref.current.title = "";
      if (!state.realtimeValidation.isInvalid)
        state.updateValidation($e93e671b31057976$var$getNativeValidity(ref.current));
    }
  });
  let onReset = (0, $8ae05eaa5c114e9c$export$7f54fc3180508a52)(() => {
    state.resetValidation();
  });
  let onInvalid = (0, $8ae05eaa5c114e9c$export$7f54fc3180508a52)((e) => {
    var _ref_current;
    if (!state.displayValidation.isInvalid)
      state.commitValidation();
    let form = ref === null || ref === void 0 ? void 0 : (_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.form;
    if (!e.defaultPrevented && ref && form && $e93e671b31057976$var$getFirstInvalidInput(form) === ref.current) {
      var _ref_current1;
      if (focus)
        focus();
      else
        (_ref_current1 = ref.current) === null || _ref_current1 === void 0 ? void 0 : _ref_current1.focus();
      (0, $507fabe10e71c6fb$export$8397ddfc504fdb9a)("keyboard");
    }
    e.preventDefault();
  });
  let onChange = (0, $8ae05eaa5c114e9c$export$7f54fc3180508a52)(() => {
    state.commitValidation();
  });
  (0, $2tWuM$useEffect)(() => {
    let input = ref === null || ref === void 0 ? void 0 : ref.current;
    if (!input)
      return;
    let form = input.form;
    input.addEventListener("invalid", onInvalid);
    input.addEventListener("change", onChange);
    form === null || form === void 0 ? void 0 : form.addEventListener("reset", onReset);
    return () => {
      input.removeEventListener("invalid", onInvalid);
      input.removeEventListener("change", onChange);
      form === null || form === void 0 ? void 0 : form.removeEventListener("reset", onReset);
    };
  }, [
    ref,
    onInvalid,
    onChange,
    onReset,
    validationBehavior
  ]);
}
function $e93e671b31057976$var$getValidity(input) {
  let validity = input.validity;
  return {
    badInput: validity.badInput,
    customError: validity.customError,
    patternMismatch: validity.patternMismatch,
    rangeOverflow: validity.rangeOverflow,
    rangeUnderflow: validity.rangeUnderflow,
    stepMismatch: validity.stepMismatch,
    tooLong: validity.tooLong,
    tooShort: validity.tooShort,
    typeMismatch: validity.typeMismatch,
    valueMissing: validity.valueMissing,
    valid: validity.valid
  };
}
function $e93e671b31057976$var$getNativeValidity(input) {
  return {
    isInvalid: !input.validity.valid,
    validationDetails: $e93e671b31057976$var$getValidity(input),
    validationErrors: input.validationMessage ? [
      input.validationMessage
    ] : []
  };
}
function $e93e671b31057976$var$getFirstInvalidInput(form) {
  for (let i = 0; i < form.elements.length; i++) {
    let element = form.elements[i];
    if (!element.validity.valid)
      return element;
  }
  return null;
}

// ../../node_modules/@react-stately/form/dist/import.mjs
import { createContext as $jcIOw$createContext, useMemo as $jcIOw$useMemo, useContext as $jcIOw$useContext, useState as $jcIOw$useState, useRef as $jcIOw$useRef, useEffect as $jcIOw$useEffect } from "react";
var $e5be200c675c3b3a$export$aca958c65c314e6c = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valueMissing: false,
  valid: true
};
var $e5be200c675c3b3a$var$CUSTOM_VALIDITY_STATE = {
  ...$e5be200c675c3b3a$export$aca958c65c314e6c,
  customError: true,
  valid: false
};
var $e5be200c675c3b3a$export$dad6ae84456c676a = {
  isInvalid: false,
  validationDetails: $e5be200c675c3b3a$export$aca958c65c314e6c,
  validationErrors: []
};
var $e5be200c675c3b3a$export$571b5131b7e65c11 = (0, $jcIOw$createContext)({});
var $e5be200c675c3b3a$export$a763b9476acd3eb = "__formValidationState" + Date.now();
function $e5be200c675c3b3a$export$fc1a364ae1f3ff10(props) {
  if (props[$e5be200c675c3b3a$export$a763b9476acd3eb]) {
    let { realtimeValidation, displayValidation, updateValidation, resetValidation, commitValidation } = props[$e5be200c675c3b3a$export$a763b9476acd3eb];
    return {
      realtimeValidation,
      displayValidation,
      updateValidation,
      resetValidation,
      commitValidation
    };
  }
  return $e5be200c675c3b3a$var$useFormValidationStateImpl(props);
}
function $e5be200c675c3b3a$var$useFormValidationStateImpl(props) {
  let { isInvalid, validationState, name, value, builtinValidation, validate, validationBehavior = "aria" } = props;
  if (validationState)
    isInvalid || (isInvalid = validationState === "invalid");
  let controlledError = isInvalid ? {
    isInvalid: true,
    validationErrors: [],
    validationDetails: $e5be200c675c3b3a$var$CUSTOM_VALIDITY_STATE
  } : null;
  let clientError = (0, $jcIOw$useMemo)(() => $e5be200c675c3b3a$var$getValidationResult($e5be200c675c3b3a$var$runValidate(validate, value)), [
    validate,
    value
  ]);
  if (builtinValidation === null || builtinValidation === void 0 ? void 0 : builtinValidation.validationDetails.valid)
    builtinValidation = null;
  let serverErrors = (0, $jcIOw$useContext)($e5be200c675c3b3a$export$571b5131b7e65c11);
  let serverErrorMessages = (0, $jcIOw$useMemo)(() => {
    if (name)
      return Array.isArray(name) ? name.flatMap((name2) => $e5be200c675c3b3a$var$asArray(serverErrors[name2])) : $e5be200c675c3b3a$var$asArray(serverErrors[name]);
    return [];
  }, [
    serverErrors,
    name
  ]);
  let [lastServerErrors, setLastServerErrors] = (0, $jcIOw$useState)(serverErrors);
  let [isServerErrorCleared, setServerErrorCleared] = (0, $jcIOw$useState)(false);
  if (serverErrors !== lastServerErrors) {
    setLastServerErrors(serverErrors);
    setServerErrorCleared(false);
  }
  let serverError = (0, $jcIOw$useMemo)(() => $e5be200c675c3b3a$var$getValidationResult(isServerErrorCleared ? [] : serverErrorMessages), [
    isServerErrorCleared,
    serverErrorMessages
  ]);
  let nextValidation = (0, $jcIOw$useRef)($e5be200c675c3b3a$export$dad6ae84456c676a);
  let [currentValidity, setCurrentValidity] = (0, $jcIOw$useState)($e5be200c675c3b3a$export$dad6ae84456c676a);
  let lastError = (0, $jcIOw$useRef)($e5be200c675c3b3a$export$dad6ae84456c676a);
  let commitValidation = () => {
    if (!commitQueued)
      return;
    setCommitQueued(false);
    let error = clientError || builtinValidation || nextValidation.current;
    if (!$e5be200c675c3b3a$var$isEqualValidation(error, lastError.current)) {
      lastError.current = error;
      setCurrentValidity(error);
    }
  };
  let [commitQueued, setCommitQueued] = (0, $jcIOw$useState)(false);
  (0, $jcIOw$useEffect)(commitValidation);
  let realtimeValidation = controlledError || serverError || clientError || builtinValidation || $e5be200c675c3b3a$export$dad6ae84456c676a;
  let displayValidation = validationBehavior === "native" ? controlledError || serverError || currentValidity : controlledError || serverError || clientError || builtinValidation || currentValidity;
  return {
    realtimeValidation,
    displayValidation,
    updateValidation(value2) {
      if (validationBehavior === "aria" && !$e5be200c675c3b3a$var$isEqualValidation(currentValidity, value2))
        setCurrentValidity(value2);
      else
        nextValidation.current = value2;
    },
    resetValidation() {
      let error = $e5be200c675c3b3a$export$dad6ae84456c676a;
      if (!$e5be200c675c3b3a$var$isEqualValidation(error, lastError.current)) {
        lastError.current = error;
        setCurrentValidity(error);
      }
      if (validationBehavior === "native")
        setCommitQueued(false);
      setServerErrorCleared(true);
    },
    commitValidation() {
      if (validationBehavior === "native")
        setCommitQueued(true);
      setServerErrorCleared(true);
    }
  };
}
function $e5be200c675c3b3a$var$asArray(v) {
  if (!v)
    return [];
  return Array.isArray(v) ? v : [
    v
  ];
}
function $e5be200c675c3b3a$var$runValidate(validate, value) {
  if (typeof validate === "function") {
    let e = validate(value);
    if (e && typeof e !== "boolean")
      return $e5be200c675c3b3a$var$asArray(e);
  }
  return [];
}
function $e5be200c675c3b3a$var$getValidationResult(errors) {
  return errors.length ? {
    isInvalid: true,
    validationErrors: errors,
    validationDetails: $e5be200c675c3b3a$var$CUSTOM_VALIDITY_STATE
  } : null;
}
function $e5be200c675c3b3a$var$isEqualValidation(a, b) {
  if (a === b)
    return true;
  return a && b && a.isInvalid === b.isInvalid && a.validationErrors.length === b.validationErrors.length && a.validationErrors.every((a2, i) => a2 === b.validationErrors[i]) && Object.entries(a.validationDetails).every(([k, v]) => b.validationDetails[k] === v);
}

// src/file-drop-zone.tsx
import { omit } from "lodash";
import { jsx, jsxs } from "react/jsx-runtime";
var imageMimeTypes = /* @__PURE__ */ new Set([
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/webp"
]);
function FileDropZone(props) {
  const { label, className, acceptedMimeTypes, error } = props;
  const [file, setFile] = useState();
  const state = $e5be200c675c3b3a$export$fc1a364ae1f3ff10({
    validationBehavior: "native",
    ...props,
    value: file
  });
  const { commitValidation } = state;
  const { isInvalid, validationErrors } = state.displayValidation;
  const inputRef = useRef(null);
  $e93e671b31057976$export$b8473d3665f3a75a(props, state, inputRef);
  const ref = useRef(null);
  const { isFocusVisible, focusProps } = useFocusRing();
  const { dropProps, isDropTarget } = useDrop({
    ref,
    onDrop(event) {
      const item = event.items.find((item2) => item2.kind === "file");
      if (item === void 0) {
        return;
      }
      (async () => {
        const file2 = await item.getFile();
        setFile(file2);
        commitValidation();
      })();
    }
  });
  const inputChangeHandler = (event) => {
    if (props.onChange) {
      props.onChange(event);
    }
    if (event.target.files === null || event.target.files.length === 0) {
      return;
    }
    setFile(event.target.files[0]);
    commitValidation();
  };
  const dropZoneClickHandler = () => {
    const input = inputRef.current;
    if (input !== null) {
      input.click();
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ...mergeProps(dropProps, focusProps),
      ref,
      role: "button",
      tabIndex: 0,
      className: cx(
        "rounded border border-dashed border-stone-500 p-4 text-stone-500 hover:bg-stone-800 outline-none flex flex-col justify-center items-center text-center",
        isDropTarget && "bg-stone-800",
        isFocusVisible && "border-stone-50",
        className
      ),
      onClick: dropZoneClickHandler,
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ...omit(props, [
              "className",
              "acceptedMimeTypes",
              "label",
              "error"
            ]),
            ref: inputRef,
            type: "file",
            className: "hidden",
            accept: acceptedMimeTypes?.join(","),
            onChange: inputChangeHandler
          }
        ),
        !isInvalid && file && imageMimeTypes.has(file.type) && /* @__PURE__ */ jsx(
          "img",
          {
            src: URL.createObjectURL(file),
            alt: "Submitted image",
            height: 128,
            width: 128
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "mt-2 text-stone-500", children: file ? file.name : label }),
        (error ?? isInvalid) && /* @__PURE__ */ jsx("div", { className: "mt-2 text-red-400", children: error ?? validationErrors.join(" ") })
      ]
    }
  );
}

export {
  FileDropZone
};
//# sourceMappingURL=chunk-IQUELUQA.js.map
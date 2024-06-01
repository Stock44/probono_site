import {
  SubmitButton
} from "./chunk-5E4CTXJI.js";

// src/form-header.tsx
import Save from "@material-design-icons/svg/round/save.svg";
import { jsx, jsxs } from "react/jsx-runtime";
function FormHeader(props) {
  const { title, description } = props;
  return /* @__PURE__ */ jsxs("div", { className: "mb-4 flex flex-wrap items-end gap-3", children: [
    /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-auto", children: [
      /* @__PURE__ */ jsx("h1", { className: "mb-2 text-4xl text-stone-200", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-stone-300", children: description })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "hidden grow lg:block" }),
    /* @__PURE__ */ jsx(SubmitButton, { icon: /* @__PURE__ */ jsx(Save, {}), className: "shadow-stone-700 glow-xl", children: "Guardar" })
  ] });
}

export {
  FormHeader
};
//# sourceMappingURL=chunk-LI6DSRCF.js.map
import {
  LinkButton
} from "./chunk-BSGEI2WN.js";
import {
  ModalTrigger
} from "./chunk-Q4LP4W3Z.js";
import {
  Dialog
} from "./chunk-QZGCNRQF.js";

// src/delete-dialog-trigger.tsx
import Delete from "@material-design-icons/svg/round/delete.svg";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function DeleteDialogTrigger() {
  return /* @__PURE__ */ jsx(
    ModalTrigger,
    {
      className: "mb-4 text-red-500",
      variant: "outlined",
      size: "lg",
      label: /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Delete, { className: "me-1 fill-current" }),
        "Eliminar cuenta"
      ] }),
      children: /* @__PURE__ */ jsx(Dialog, { title: "Borrar mi cuenta", className: "text-red-500", children: /* @__PURE__ */ jsxs(
        LinkButton,
        {
          href: "/api/auth/reauth?returnTo=/api/account/confirmDeletion",
          variant: "primary",
          className: "bg-red-500 text-stone-50 hover:bg-red-400 hover:text-stone-50",
          children: [
            /* @__PURE__ */ jsx(Delete, { className: "fill-current" }),
            "Borrar cuenta"
          ]
        }
      ) })
    }
  );
}

export {
  DeleteDialogTrigger
};
//# sourceMappingURL=chunk-KQKK6XZ5.js.map
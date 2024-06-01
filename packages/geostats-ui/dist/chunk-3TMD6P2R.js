import {
  cx
} from "./chunk-2BW276DM.js";

// src/list-box.tsx
import React, { useRef } from "react";
import {
  mergeProps,
  useFocusRing,
  useListBox,
  useListBoxSection,
  useOption
} from "react-aria";
import { useListState } from "react-stately";
import { twMerge } from "tailwind-merge";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function ListBox(props) {
  return "state" in props ? /* @__PURE__ */ jsx(BaseListBox, { ...props }) : /* @__PURE__ */ jsx(StatefulListBox, { ...props });
}
function StatefulListBox(props) {
  const state = useListState(props);
  return /* @__PURE__ */ jsx(BaseListBox, { ...props, state });
}
function BaseListBox(props) {
  const { label, state, className } = props;
  const listBoxRef = useRef(null);
  const { listBoxProps, labelProps } = useListBox(props, state, listBoxRef);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    label ? /* @__PURE__ */ jsx(
      "label",
      {
        ...labelProps,
        className: "mb-2 block px-2 text-xl text-stone-200",
        children: label
      }
    ) : null,
    /* @__PURE__ */ jsx(
      "ul",
      {
        ...listBoxProps,
        ref: listBoxRef,
        className: twMerge(
          "rounded overflow-y-auto scroll-smooth scrollbar-track-transparent scrollbar-thumb-stone-50 scrollbar-thin scrollbar-thumb-rounded",
          className
        ),
        children: [...state.collection].map(
          (item) => item.type === "section" ? /* @__PURE__ */ jsx(
            ListBoxSection,
            {
              section: item,
              state
            },
            item.key
          ) : /* @__PURE__ */ jsx(Option, { item, state }, item.key)
        )
      }
    )
  ] });
}
function ListBoxSection(props) {
  const { section, state } = props;
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    "aria-label": section["aria-label"]
  });
  return /* @__PURE__ */ jsxs("li", { ...itemProps, className: "p-2", children: [
    section.rendered && /* @__PURE__ */ jsx(
      "div",
      {
        ...headingProps,
        className: cx(
          "font-semibold py-2 text-sm text-stone-200 top-0",
          section.key !== state.collection.getFirstKey() && "mt-2"
        ),
        children: section.rendered
      }
    ),
    /* @__PURE__ */ jsx("ul", { ...groupProps, children: [...state.collection.getChildren(section.key)].map((node) => /* @__PURE__ */ jsx(Option, { item: node, state }, node.key)) })
  ] });
}
function Option(props) {
  const { item, state } = props;
  const ref = React.useRef(null);
  const { isSelected, optionProps, isFocused, allowsSelection } = useOption(
    { key: item.key },
    state,
    ref
  );
  const { isFocusVisible, focusProps } = useFocusRing();
  return /* @__PURE__ */ jsx(
    "li",
    {
      ...mergeProps(optionProps, focusProps),
      ref,
      className: cx(
        "text-stone-300 p-2 border rounded border-transparent outline-none cursor-pointer data-[focus-visible=true]:border-stone-50",
        isSelected && "bg-stone-50 text-stone-800",
        allowsSelection && !isSelected && "hover:bg-stone-800",
        allowsSelection && isFocused && !isSelected && "bg-stone-900"
      ),
      "data-focus-visible": isFocusVisible,
      children: item.rendered
    }
  );
}

export {
  ListBox,
  BaseListBox
};
//# sourceMappingURL=chunk-3TMD6P2R.js.map
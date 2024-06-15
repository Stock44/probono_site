import {
  TagGroup
} from "./chunk-NDV4SDDU.js";
import {
  ComboBox
} from "./chunk-YSDLOLVT.js";
import {
  $bdb11010cef70236$export$f680877a34711e37
} from "./chunk-VPMSH5IA.js";
import {
  cx
} from "./chunk-2BW276DM.js";

// src/combo-box-tag-multi-select.tsx
import { useMemo } from "react";
import { useListState } from "react-stately";
import { Seq, Set } from "immutable";
import { jsx, jsxs } from "react/jsx-runtime";
function ComboBoxTagMultiSelect(props) {
  const {
    items,
    filteredKeys,
    setSelectedKeys,
    filterText,
    setFilterText,
    selectedKeys,
    children,
    label,
    className,
    searchPlaceholder
  } = props;
  const { collection, selectionManager } = useListState({
    items,
    children,
    selectedKeys,
    onSelectionChange(keys) {
      setSelectedKeys(Set(keys));
    },
    selectionMode: "multiple"
  });
  const id = $bdb11010cef70236$export$f680877a34711e37();
  const selectedItems = useMemo(
    () => Seq(selectionManager.selectedKeys).map((key) => collection.getItem(key).value).toList(),
    [collection, selectionManager]
  );
  const filteredItems = useMemo(
    () => Seq(filteredKeys).map((key) => collection.getItem(key).value).toList(),
    [collection, filteredKeys]
  );
  return /* @__PURE__ */ jsxs("div", { className: cx("group w-fit", className), children: [
    label === void 0 ? null : /* @__PURE__ */ jsx(
      "p",
      {
        className: "text-sm text-stone-300 group-focus-within:text-stone-50",
        id,
        children: label
      }
    ),
    /* @__PURE__ */ jsx(
      TagGroup,
      {
        "aria-labelledby": id,
        items: selectedItems,
        className: cx(
          (selectedKeys === "all" || selectedKeys.size > 0) && "mb-2"
        ),
        onRemove: (keys) => {
          for (const key of keys) {
            selectionManager.toggleSelection(key);
          }
        },
        children
      }
    ),
    /* @__PURE__ */ jsx(
      ComboBox,
      {
        "aria-labelledby": id,
        placeholder: searchPlaceholder,
        items: filteredItems,
        inputValue: filterText,
        className: "w-full",
        onInputChange: setFilterText,
        onSelectionChange: (key) => {
          if (key === null) {
            if (filterText !== "") {
              setFilterText("");
            }
            return;
          }
          setFilterText("");
          if (selectedKeys === "all") {
            return;
          }
          setSelectedKeys(selectedKeys.add(key));
        },
        children
      }
    )
  ] });
}

export {
  ComboBoxTagMultiSelect
};
//# sourceMappingURL=chunk-HDFVTNRX.js.map
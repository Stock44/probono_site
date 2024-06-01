import {
  useFuse
} from "./chunk-XFV6XJTW.js";
import {
  useImmutableListData
} from "./chunk-OFUINEFA.js";

// src/hooks/use-searchable-list-data.ts
import { useMemo } from "react";
import { OrderedSet, Seq } from "immutable";
function useSearchableListData(options) {
  const {
    searchKeys,
    getKey = (value) => {
      if (Object.hasOwn(value, "id")) {
        return value.id;
      }
      if (Object.hasOwn(value, "key")) {
        return value.key;
      }
      throw new Error(
        "searchable list data item does not have an id or key attribute, and getKey is undefined"
      );
    }
  } = options;
  const listData = useImmutableListData(options);
  const { items, selectedKeys, filterText } = listData;
  const fuse = useFuse(items, {
    keys: searchKeys?.toArray()
  });
  const filteredKeys = useMemo(() => {
    if (selectedKeys === "all") {
      return OrderedSet();
    }
    if (fuse === void 0 || filterText === "") {
      return Seq(items).map((item) => getKey(item)).toOrderedSet().subtract(selectedKeys);
    }
    const results = OrderedSet(
      fuse.search(filterText).map((result) => getKey(result.item))
    );
    return results.subtract(selectedKeys);
  }, [selectedKeys, fuse, filterText, items, getKey]);
  return {
    ...listData,
    filteredKeys
  };
}

export {
  useSearchableListData
};
//# sourceMappingURL=chunk-MGL37AJF.js.map
// src/hooks/use-immutable-list-data.ts
import {
  useListData
} from "react-stately";
import { List, Set } from "immutable";
import { useMemo } from "react";
function useImmutableListData(options) {
  const listData = useListData({
    ...options,
    initialItems: options.initialItems === void 0 ? void 0 : [...options.initialItems]
  });
  const items = useMemo(() => List(listData.items), [listData.items]);
  const selectedKeys = useMemo(() => {
    const { selectedKeys: selectedKeys2 } = listData;
    if (selectedKeys2 === "all") {
      return "all";
    }
    return Set(selectedKeys2);
  }, [listData]);
  return {
    ...listData,
    items,
    selectedKeys,
    setSelectedKeys(keys) {
      if (keys === "all") {
        listData.setSelectedKeys("all");
        return;
      }
      listData.setSelectedKeys(keys);
    }
  };
}

export {
  useImmutableListData
};
//# sourceMappingURL=chunk-OFUINEFA.js.map
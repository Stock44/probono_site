// src/hooks/use-reorderable-list-state.ts
import { useListState } from "react-stately";
function useReorderableListState(props) {
  const { onReorder } = props;
  const state = useListState(props);
  return {
    ...state,
    reorder(key, previous, next) {
      onReorder(key, previous, next);
    }
  };
}

export {
  useReorderableListState
};
//# sourceMappingURL=chunk-JW5CXDCB.js.map
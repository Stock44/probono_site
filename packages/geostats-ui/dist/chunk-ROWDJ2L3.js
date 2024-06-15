import {
  useReorderableListState
} from "./chunk-JW5CXDCB.js";
import {
  Spacer
} from "./chunk-H6HIFH35.js";
import {
  button_default
} from "./chunk-NCCLLHSG.js";
import {
  cx
} from "./chunk-2BW276DM.js";

// src/list-prioritizer.tsx
import { useMemo, useState } from "react";
import { Map, Seq } from "immutable";
import DragHandle from "@material-design-icons/svg/round/drag_handle.svg";
import Remove from "@material-design-icons/svg/round/remove.svg";
import { jsx, jsxs } from "react/jsx-runtime";
function ListPrioritizer(props) {
  const { onRemove, className } = props;
  const { collection, reorder } = useReorderableListState(props);
  const [dragStartY, setDragStartY] = useState(0);
  const [deltaY, setDeltaY] = useState(0);
  const [activityReferences, setActivityReferences] = useState(Map());
  const [draggedActivity, setDraggedActivity] = useState();
  const handleMove = (deltaY2, key) => {
    setDeltaY(deltaY2);
    const previousKey = collection.getKeyBefore(key);
    if (previousKey !== null && previousKey !== void 0) {
      const previousContainer = activityReferences.get(key);
      if (previousContainer !== void 0 && deltaY2 < -(previousContainer.clientHeight / 2)) {
        setDragStartY(previousContainer.getBoundingClientRect().y);
        setDeltaY(0);
        reorder(key, previousKey);
      }
    }
    const nextKey = collection.getKeyAfter(key);
    if (nextKey !== null && nextKey !== void 0) {
      const nextContainer = activityReferences.get(key);
      if (nextContainer !== void 0 && deltaY2 > nextContainer.clientHeight) {
        setDragStartY(
          nextContainer.getBoundingClientRect().y + nextContainer.clientHeight / 2
        );
        setDeltaY(0);
        reorder(key, void 0, nextKey);
      }
    }
  };
  const touchStartHandler = (key) => (event) => {
    setDraggedActivity(key);
    const rect = event.currentTarget.getBoundingClientRect();
    setDragStartY(rect.y + rect.height / 2);
  };
  const dragStartHandler = (key) => (event) => {
    event.dataTransfer.setDragImage(new Image(), 0, 0);
    setDraggedActivity(key);
    const rect = event.currentTarget.getBoundingClientRect();
    setDragStartY(rect.y + rect.height / 2);
  };
  const touchHandler = (key) => (event) => {
    if (event.touches.length !== 1) {
      return;
    }
    const deltaY2 = event.touches[0].clientY - dragStartY;
    handleMove(deltaY2, key);
  };
  const dragHandler = (key) => (event) => {
    if (event.clientY === 0) {
      return;
    }
    const deltaY2 = event.clientY - dragStartY;
    handleMove(deltaY2, key);
  };
  const dragEndHandler = () => {
    setDraggedActivity(void 0);
    setDragStartY(0);
    setDeltaY(0);
  };
  const draggedActivityOffset = useMemo(() => {
    if (draggedActivity === void 0) {
      return;
    }
    if (draggedActivity === collection.getFirstKey() && deltaY < 0) {
      return "0px";
    }
    if (draggedActivity === collection.getLastKey() && deltaY > 0) {
      return "0px";
    }
    return `${deltaY}px`;
  }, [collection, deltaY, draggedActivity]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cx(
        "grow basis-5/12 border border-stone-700 rounded divide-stone-700 divide-y",
        className
      ),
      children: Seq(collection).map((activity) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "relative",
          style: {
            height: draggedActivity === activity.key ? `${activityReferences.get(activity.key)?.clientHeight ?? 0}px` : void 0
          },
          children: /* @__PURE__ */ jsxs(
            "div",
            {
              ref: (element) => {
                if (element !== null) {
                  setActivityReferences(
                    (current) => current.set(activity.key, element)
                  );
                }
              },
              className: cx(
                draggedActivity === activity.key && "absolute z-10 bg-stone-900 w-full border-y border-stone-700",
                draggedActivity === void 0 && "hover:bg-stone-900",
                "flex items-center gap-4 rounded grow text-stone-200 p-2 group select-none left-0"
              ),
              style: {
                top: draggedActivity === activity.key ? draggedActivityOffset : void 0
              },
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    draggable: true,
                    className: "cursor-grab touch-none fill-stone-400",
                    onTouchStart: touchStartHandler(activity.key),
                    onTouchMove: touchHandler(activity.key),
                    onTouchEnd: dragEndHandler,
                    onDragStart: dragStartHandler(activity.key),
                    onDrag: dragHandler(activity.key),
                    onDragEnd: dragEndHandler,
                    children: /* @__PURE__ */ jsx(DragHandle, {})
                  }
                ),
                activity.rendered,
                /* @__PURE__ */ jsx(Spacer, {}),
                /* @__PURE__ */ jsx(
                  button_default,
                  {
                    className: "bg-transparent hover:bg-stone-700",
                    variant: "text",
                    onPress: () => {
                      onRemove(activity.key);
                    },
                    children: /* @__PURE__ */ jsx(Remove, { className: "fill-current" })
                  }
                )
              ]
            }
          )
        },
        activity.key
      ))
    }
  );
}

export {
  ListPrioritizer
};
//# sourceMappingURL=chunk-ROWDJ2L3.js.map
// src/hooks/use-fuse.ts
import { useEffect, useRef } from "react";
function useFuse(items, options) {
  const fuseRef = useRef();
  useEffect(() => {
    void (async () => {
      const fuse = await import("./fuse-C577DNTJ.js");
      fuseRef.current = new fuse.default(items.toArray(), options);
    })();
  }, [items]);
  return fuseRef.current;
}

export {
  useFuse
};
//# sourceMappingURL=chunk-XFV6XJTW.js.map
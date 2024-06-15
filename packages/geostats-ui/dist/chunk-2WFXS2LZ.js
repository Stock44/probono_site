import {
  useToasts
} from "./chunk-P6WNTMIX.js";

// src/hash-spy-toaster.tsx
import { useEffect } from "react";
function HashSpyToaster(props) {
  const { toast, hash } = props;
  const toasts = useToasts();
  useEffect(() => {
    const hashes = window.location.hash.slice(1).split(",");
    if (hashes.includes(hash)) {
      toasts.add(toast);
    }
  }, [toast, hash]);
  return null;
}

export {
  HashSpyToaster
};
//# sourceMappingURL=chunk-2WFXS2LZ.js.map
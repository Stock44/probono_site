// src/modal/modal-context.ts
import { createContext, useContext } from "react";
var modalContext = createContext(null);
function useCloseModal() {
  const closeModal = useContext(modalContext);
  if (!closeModal) {
    throw new Error("useCloseModal not used within a modal");
  }
  return closeModal;
}

export {
  modalContext,
  useCloseModal
};
//# sourceMappingURL=chunk-E6V3DQUE.js.map
// src/cva.ts
import { defineConfig } from "cva";
import { twMerge } from "tailwind-merge";
var { cva, compose, cx } = defineConfig({
  hooks: {
    onComplete: (className) => twMerge(className)
  }
});

export {
  cva,
  cx
};
//# sourceMappingURL=chunk-JO3XUUYI.js.map
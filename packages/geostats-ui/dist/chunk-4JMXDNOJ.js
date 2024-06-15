import {
  cva
} from "./chunk-JO3XUUYI.js";

// src/paper/paper-variants.tsx
var paperVariants = cva({
  base: "rounded border border-stone-800 bg-stone-900/5 text-stone-300 backdrop-blur transition-all",
  variants: {
    hoverEffect: {
      true: "duration-500 hover:scale-[101%] hover:border-stone-700 hover:glow-sm",
      false: ""
    },
    spacing: {
      none: "p-0",
      xs: "p-1",
      sm: "p-2",
      md: "p-4",
      lg: "p-8",
      xl: "p-16"
    }
  },
  defaultVariants: {
    spacing: "md",
    hoverEffect: false
  }
});
var paper_variants_default = paperVariants;

export {
  paper_variants_default
};
//# sourceMappingURL=chunk-4JMXDNOJ.js.map
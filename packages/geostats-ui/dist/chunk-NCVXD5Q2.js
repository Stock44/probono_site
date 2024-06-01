import {
  cx
} from "./chunk-2BW276DM.js";

// src/social-link.tsx
import Image from "next/image";
import { jsx } from "react/jsx-runtime";
function SocialLink(props) {
  const { image, href, name, className, size = 24 } = props;
  return /* @__PURE__ */ jsx(
    "a",
    {
      href,
      className: cx("flex justify-center items-center", className),
      target: "_blank",
      rel: "noreferrer",
      children: /* @__PURE__ */ jsx(Image, { src: image, alt: name, height: size, width: size })
    }
  );
}

export {
  SocialLink
};
//# sourceMappingURL=chunk-NCVXD5Q2.js.map
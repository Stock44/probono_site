module.exports = {
  extends: ["plugin:@next/next/recommended", "xo-react"],
  ignores: ["./*"],
  rules: {
    "react/require-default-props": "off",
    "react/prop-types": "off",
    "n/file-extension-in-import": "off",
    "n/prefer-global/process": "off",
    "new-cap": "off",
	  "react/button-has-type": "off",
	  "react/jsx-indent-props": "off",
	  "react/jsx-closing-bracket-location": "off",
	  "react/jsx-closing-tag-location": "off",
	  "react/jsx-no-bind": "off",
	  "@typescript-eslint/ban-types": "off",
	  "@typescript-eslint/no-unnecessary-type-assertion": "off"
  },
};

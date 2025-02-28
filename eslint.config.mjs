import { FlatCompat } from "@eslint/eslintrc";

//docs
// https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next"],
    rules: {
      "react/no-unescaped-entities": "error",
      "@next/next/no-page-custom-font": "error",
    },
  }),
];

export default eslintConfig;

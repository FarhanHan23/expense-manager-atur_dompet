import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import stylistic from "@stylistic/eslint-plugin";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      "@stylistic": stylistic,
    },
    rules: {
      // Memberi baris kosong antar statement/fungsi agar tidak menumpuk
      "@stylistic/padding-line-between-statements": "off",
    },
  },
  {
      languageOptions: {
        globals: {
          describe: "readonly",
          it: "readonly",
          expect: "readonly",
          beforeEach: "readonly",
          afterEach: "readonly",
        },
      },
    },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

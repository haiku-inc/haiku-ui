import path from "node:path";
import { fileURLToPath } from "node:url";
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  {
    ignores: [
      "dist",
      "public",
      ".prettierrc.js",
      "SCORM_FILES/**",
      // Third-party Transformers.js browser bundle (minified; not authored here).
      "src/pages/Hades/views/dataset/embeddings-transformers.web.js",
      // Vendored reference material (e.g. Wireshark Qt `.ts` translation XML — not TypeScript); not authored here.
      "docs/HADES_Reference_Corpus/**",
    ],
  },
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        tsconfigRootDir: __dirname,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    settings: {
      react: {
        version: "detect",
      },
    }
  },
  {
    rules: {
      semi: 'error',
      'prefer-const': 'error',
      'no-console': 'error',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: [
      "eslint.config.mjs",
      "lint-staged.config.mjs",
      "scripts/**/*.{js,mjs,cjs}",
      "services/ingestion-sidecar/**/*.{js,mjs,cjs}",
    ],
    languageOptions: { globals: globals.node },
  },
  {
    files: ["scripts/**/*.{js,mjs,cjs}"],
    rules: { "no-console": "off" },
  },
  {
    files: ["services/ingestion-sidecar/scripts/**/*.js"],
    rules: { "no-console": "off" },
  },
  {
    files: ["src/pages/Hades/**/*.{ts,tsx}"],
    rules: {
      // Guardrail against new mega-files (HADES code-health, see docs/HADES_TECH_DEBT.md).
      // `warn`, so it never blocks CI/commits — it surfaces a backlog and nudges new growth.
      // Existing large files are intentionally not exempted; they show up as the backlog.
      "max-lines": ["warn", { max: 1200, skipBlankLines: true, skipComments: true }],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@mui/material/Box",
              message: "Use Divider, or native layout elements with tailwind classes; MUI Box is not used in HADES.",
            },
          ],
        },
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXOpeningElement[name.name='Box']",
          message:
            "Do not use <Box> in HADES (catches re-exports/aliases). Use Divider, or native elements with tailwind classes.",
        },
      ],
    },
  },
];

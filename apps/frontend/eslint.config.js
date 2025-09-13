import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config([
    { ignores: ["dist"] },
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            prettierConfig,
        ],
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            prettier: prettierPlugin,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
            "prettier/prettier": "error",
        },
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
    },
]);

import * as eslintPlugin from "../index";

import { expect, test } from "@playwright/test";

import { ESLint } from "eslint";
import path from "path";

const ruleName = "dialog-html-element-allowlist";

test.describe(ruleName, () => {
    let eslint = new ESLint({
        useEslintrc: false,
        overrideConfigFile: "./src/tests/files/test.config.json",
        rulePaths: ["./dist/rules"],
        overrideConfig: {
            rules: {
                [ruleName]: 2,
            },
        },
        cwd: path.dirname(require.resolve("package.json")),
        plugins: { "eslint-plugin-starter": eslintPlugin },
    });
    let invalidMessages: any;
    let validMessages: any;

    test.beforeAll(() => {
        eslint
            .lintFiles([
                path.resolve(__dirname, `./files/${ruleName}.invalid.ts`),
            ])
            .then((contents: any) => {
                invalidMessages = contents[0].messages;
            });
        eslint
            .lintFiles([path.resolve(__dirname, `./files/${ruleName}.valid.ts`)])
            .then((contents: any) => {
                validMessages = contents[0].messages;
            });
    });

    test("valid example does not contain error messages", () => {
        expect(validMessages).toHaveLength(0);
    });

    test("invalid example does contain an error message", () => {
        expect(invalidMessages).toHaveLength(1);
        expect(invalidMessages[0].ruleId).toEqual(ruleName);
    });
});
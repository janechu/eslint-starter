import { Rule } from "eslint";
import type { TemplateElement } from "estree";

const allowedHtmlElementTags: Array<string> = [
    "img",
    "h1",
    "h2",
    "h3",
    "p",
    "button"
];

// Contents of a tag
const tagRegex = /<([a-z-1-6]+)/gm;
// Get the contents of any dialog html element
const dialogContentsRegex = /(?:<\w+-dialog>)((.|\n|\r|\t)*)(?:<\/\w+-dialog>)/m;

export const meta = {
    type: "suggestion",
    docs: {
        description: `Require only the following HTML elements in the dialog: ${allowedHtmlElementTags}`,
        category: "Consistency",
        recommended: true,
        url: "https://github.com/janechu/eslint-starter/blob/main/src/rules/dialog-html-element-allowlist.md",
    },
    fixable: null,
    schema: [],
};


function containsTagNotInAllowedTagList(tags: Array<string>): boolean {
    return !!tags.find((tag) => {
        return !allowedHtmlElementTags.includes(tag);
    });
}

function findAllTags(dialogContent: string): Array<string> | null {
    return dialogContent.match(tagRegex);
}

export function create(context: Rule.RuleContext) {
    return {
        TemplateElement(node: TemplateElement) {
            const contents = node.value.raw.match(dialogContentsRegex);

            if (Array.isArray(contents)) {
                let tags = findAllTags(contents[1]);

                if (Array.isArray(tags)) {
                    tags = tags.map((tag) => {
                        return tag.slice(1); // remove the "<" part of the tag
                    });

                    if (containsTagNotInAllowedTagList(tags)) {
                        context.report({
                            node,
                            message: `Remove any tags not allowed for the dialog component, current allowed tags include: ${allowedHtmlElementTags}`,
                        });
                    }
                }
            }
        }
    };
};
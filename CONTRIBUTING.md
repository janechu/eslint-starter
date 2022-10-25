# Contributing

## Setup

To get started, ensure you have NodeJS installed. Run `npm ci` to install the dependencies.

## Testing

- `npm run test` - runs playwright tests

## Building

- `npm run build` - builds the package for publishing

## Rules

Rules are the foundation of the ESLint plugin ecosystem, they contain the logic that will be applied when the plugin is used.

### Creating a new rule

When creating a new rule, the following files should be added:

```
src/
└─ rules
   └─ <my-rule-name>.ts
tests/
└─ files
   └─ <my-rule-name>.invalid.ts
   └─ <my-rule-name>.valid.ts
└─ <my-rule-name>.spec.ts
```

The `invalid` and `valid` test files should contain content that should be considered valid or invalid.

To determine the logic necessary for a rule, use the https://astexplorer.net/, the sample code will be in the top left that will be linted, the plugin code you are creating will be in the bottom left, in the top right you will see what information is available to you for calling various methods, and in the bottom right you will see the error/warning etc., messages appear around your code.

**Other changes**
- Ensure the rule is added in the `src/index.ts`
- Ensure the rule has a `src/rules/<rule-name>.md` file and this file is a URL in the rules `meta` object
- Ensure the rule is added in the `config/recommended.ts` file

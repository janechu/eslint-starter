# eslint-plugin-starter
A ESLint repository starter template.

To convert this to your own ESLint plugin, take the following steps:

- Rename this to `<@scope>/eslint-plugin-<name>` checkout the [ESLint plugin naming conventions](https://eslint.org/docs/latest/user-guide/configuring/plugins#naming-convention)
- Rename the rules exported from the `configs/` folder to use `<@scope>` if you are including a scope

## Usage

`.eslintrc.json`
```json
{
    "extends": [
        "plugin:<@scope>/<name>/<config>"
    ],
    "plugins": [
        "<@scope>/<name>"
    ]
}
```
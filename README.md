# eslint-plugin-fsd-checker-eslint-gen

Verifying paths for compliance with FSD architecture

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-fsd-checker-gen`:

```sh
npm install eslint-plugin-fsd-checker-gen --save-dev
```

## Usage

Add `fsd-checker-gen` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:
```json
{
  "plugins": [
    "fsd-checker-gen"
  ]
}
```


Then configure the rules you want to use under the `rules` key.

```json
{
  "rules": {
    "fsd-checker-gen/rule-name": 2
  }
}
```



## Configurations

<!-- begin auto-generated configs list -->
TODO: Run eslint-doc-generator to generate the configs list (or delete this section if no configs are offered).
<!-- end auto-generated configs list -->



## Rules

<!-- begin auto-generated rules list -->

| Name                                                   | Description                                                                                                   |
| :----------------------------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| [layer-imports](docs/rules/layer-imports.md)           | Ensures that absolute imports are only from lower-level slices to higher-level slices according to FSD design |
| [path-checker](docs/rules/path-checker.md)             | feature sliced relative path checker                                                                          |
| [public-api-imports](docs/rules/public-api-imports.md) | Verifying if absolute import is done from public API (index file)                                             |

<!-- end auto-generated rules list -->



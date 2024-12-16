# Verifying if absolute import is done from public API (index file) (`fsd-checker-gen/public-api-imports`)

<!-- end auto-generated rule header -->

## Description

This rule verifies if absolute imports are done from the public API (index file) within your project. If an import is made from a file within specific layers (such as `entities`, `features`, `pages`, or `widgets`), and it is not coming from the public API (index file), a warning will be triggered.
<br>
It ensures that imports within the project follow the convention of being made from the public API, promoting cleaner and more maintainable code structure.

## Type

This rule is a **suggestion**.

## Category

**Best Practices**: This rule encourages consistent structure and adherence to best practices for managing imports.

## Recommended

Yes, this rule is recommended.

## How It Works

The rule checks all `ImportDeclaration` nodes in your code. If an absolute import is made from specific layers (like `entities`, `features`, `pages`, or `widgets`), the rule ensures that these imports are directed to the public API (i.e., the index file). Imports that do not follow this structure will trigger a warning.

### How the rule works:

1. The rule checks all imports in the files within the specified layers.
2. If the import path is absolute and does not come from the public API (index file), the rule will report a warning.
3. If the import is related to testing (within a specific layer and the `testing` folder), it will also be verified that the import comes from the correct public API testing file.

## Example Code

### Incorrect:

```js
import { someFeature } from 'entities/article/model'; // This import is not from the public API (index file)
```

### Correct:

```js
import { someFeature } from '../../model/slices/someFeature'
import { someFeature  } from 'entities/Features'
import { someFeature  } from '@/entities/Features' // if "@" is set as option "alias" for rule
```


#### Configuration Options

- **`alias`** _(optional)_:<br>
  Type: `string`  
  Description: Configures the root path for import checking. If not provided, the rule operates without any alias.
  <br>
  <br>
  Example:
  ```text
    "fsd-checker-gen/path-checker": ["error", { alias: "@" }]
  ```

- **`testFilesPatterns`** _(optional)_:<br>
  Type: `string[]` <br>
  Description: Configures extensions / names of files with test which should be imported from testing.ts or testing.js in public folder (not relative path or index file)
  <br>
  <br>
  Example:
  ```text
    "fsd-checker-gen/path-checker": ["error", { testFilesPatterns: ["**/*.test.*", "**/*.stories.*"] }]
  ```
  

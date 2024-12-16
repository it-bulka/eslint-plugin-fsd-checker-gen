# Feature sliced relative path checker (`fsd-checker-gen/path-checker`)

<!-- end auto-generated rule header -->

## Description

This rule checks if imports within a "slice" are relative. If you try to import a file from another slice using an absolute path, it will trigger a warning.

It checks paths in the following slices: `entities`, `features`, `shared`, `pages`, `widgets`.

## Type

This rule is a **suggestion**.

## Category

**Best Practices**: This rule promotes the use of best practices for your project structure.

## Recommended

Yes, this rule is recommended.

## How It Works

The rule checks all imports in your code. If the import is from the same slice, the import path should be relative (starting with `./` or `../`). If the path is not relative, the rule will report a warning.

### How the rule works:

1. The rule checks imports in files of your project.
2. It determines if the import is a relative path.
3. If the import is not relative and spans across different slices (e.g., between `entities` and `features`), a warning is triggered.

## Example Code

### Incorrect:

```js
import { someFunction } from 'features/someFeature';  // This is not a relative path

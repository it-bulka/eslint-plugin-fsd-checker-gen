# Ensures that absolute imports are only from lower-level slices to higher-level slices according to FSD design (`fsd-checker-gen/layer-imports`)

<!-- end auto-generated rule header -->

## Description

The `layer-import-rule` enforces the principles of Feature-Sliced Design (FSD) by ensuring that **absolute imports** adhere to a strict hierarchy. This helps maintain modularity, scalability, and a clear separation of concerns within your project.
A layer can only import lower-level layers (shared, entities, features, widgets, pages, app).

## Type

This rule is a **suggestion**.

## Category

**Best Practices**: This rule promotes the use of best practices for your project structure.

## Recommended

Yes, this rule is recommended.

## How It Works

The rule checks all imports in your code. If the import is from the same slice, the import path should be relative (starting with `./` or `../`). If the path is not relative, the rule will report a warning.

### How the rule works:

This rule ensures that absolute imports are only from lower-level slices to higher-level slices, based on the FSD slice hierarchy:

-`app` → Can import: `pages`, `widgets`, `features`, `shared`, `entities`
-`pages` → Can import: `widgets`, `features`, `shared`, `entities`
-`widgets` → Can import: `features`, `shared`, `entities`
-`features` → Can import: `shared`, `entities`
-`entities` → Can import: `shared`
-`shared` → Can only import: `shared`
If an import violates this hierarchy, the rule will report an error.

## Example Code

### Configuration

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
- **`ignoreImportPatterns`** _(optional)_:<br>
  Type: `string[]`<br>
  Description: Exclude the rule for patterns set in ignoreImportPatterns.
  <br>
  <br>
  Example:
  ```text
  "fsd-checker-gen/path-checker": ["error", { ignoreImportPatterns: ["**/*.test.*", "**/*.stories.*"] }]
  ```  

const {isPathRelative} = require("../helpers")
const micromatch = require("micromatch")
const path = require("path")

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: "Verifying if absolute import is done from public API (index file)",
      category: "Best Practices",
      recommended: true,
      url: null
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string'
          },
          testFilesPatterns: {
            type: 'array'
          }
        }
      }
    ]
  },

  create(context) {
    const { alias = '', testFilesPatterns = [] } = context.options[0] ?? {}

    const checkingLayers = {
      'entities': 'entities',
      'features': 'features',
      'pages': 'pages',
      'widgets': 'widgets'
    }

    return {
      ImportDeclaration(node) {
        const value = node.source.value
        const importTo = alias ? value.replace(`${alias}/`, '') : value

        if(isPathRelative(importTo)) {
          return;
        }

        // [entities, article, model, types]
        const segments = importTo.split('/')
        const layer = segments[0]

        if(!checkingLayers[layer]) {
          return;
        }

        const isImportNotFromPublicApi = segments.length > 2
        // [entities, article, testing]
        const isTestingPublicApi = segments[2] === 'testing' && segments.length < 4

        if(isImportNotFromPublicApi && !isTestingPublicApi) {
          context.report(node, 'Absolute import should be done from Public API (index file)')
        }

        if(isTestingPublicApi) {
          const currentFilePath = context.getFilename();
          const normalizedPath = path.toNamespacedPath(currentFilePath);

          const isCurrentFileTesting = testFilesPatterns.some(
            pattern => micromatch.isMatch(normalizedPath, pattern)
          )

          if(!isCurrentFileTesting) {
            context.report(node, 'Testing data  should be imported from publicApi/testing.ts(or .js)');
          }
        }
      }
    };
  },
};

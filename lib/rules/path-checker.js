"use strict"
const { isPathRelative } = require("../helpers")
const path = require('path')

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: "feature sliced relative path checker",
      category: "Best Practices",
      recommended: true,
      url: null,
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string'
          }
        }
      }
    ]
  },

  create(context) {
    const alias = context.options[0]?.alias || ''

    return {
      ImportDeclaration(node) {
        // example app/entities/Article
        const value = node.source.value
        const importTo = alias ? value.replace(`${alias}/`, '') : value

        // example C:\Users\folder\Desktop\folder\folder\src\entities\Article
        const fromFilename = context.getFilename()

        if (shouldBeRelative(fromFilename, importTo)) {
          context.report(node, 'Within one slice paths should be relative')
        }
      }
    }
  }
}

const layers = {
  'entities': 'entities',
  'features': 'features',
  'shared': 'shared',
  'pages': 'pages',
  'widgets': 'widgets',
}

function shouldBeRelative(from, to) {
  if (isPathRelative(to)) {
    return false;
  }

  const toArray = to.split('/')
  const toLayer = toArray[0]; // entities
  const toSlice = toArray[1]; // Article

  if (!toLayer || !toSlice || !layers[toLayer]) {
    return false;
  }

  const normalizedPath = path.toNamespacedPath(from);
  const projectFrom = normalizedPath.split('src')[1];
  const fromArray = projectFrom.split('\\')

  const fromLayer = fromArray[1];
  const fromSlice = fromArray[2];

  if (!fromLayer || !fromSlice || !layers[fromLayer]) {
    return false;
  }

  return fromSlice === toSlice && toLayer === fromLayer
}
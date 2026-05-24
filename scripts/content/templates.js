function createContentFileTemplate(exportName, content) {
  return `// GENERATED FILE: this content is recreated by scripts/generateContent.js\nexport const ${exportName} = ${JSON.stringify(content, null, 2)};\n`;
}

function createRouteFileTemplate(componentName, exportName, normalizedName) {
  return `// GENERATED FILE: this route is recreated by scripts/generateContent.js\nimport ContentPage from '../components/ContentPage';\nimport type { ContentBlock } from '../content/types';\nimport { ${exportName} } from '../content/lessons/${normalizedName}Content';\n\nexport default function ${componentName}() {\n  return <ContentPage title="${componentName}" contentModule={${exportName} as ContentBlock[]} />;\n}\n`;
}

module.exports = {
  createContentFileTemplate,
  createRouteFileTemplate,
};

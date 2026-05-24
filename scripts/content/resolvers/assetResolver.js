const fs = require('fs');
const path = require('path');

function findFileWithExtensions(fileName, folderPath, assetsDir, supportedExtensions) {
  if (!fileName) return null;

  const fullFolderPath = path.join(assetsDir, folderPath);
  const normalizedInput = String(fileName).trim().toLowerCase();
  const inputExtension = path.extname(normalizedInput);
  const inputBaseName = path.basename(normalizedInput, inputExtension);

  try {
    const files = fs.readdirSync(fullFolderPath);
    const normalizedFiles = files.map((file) => ({
      original: file,
      lower: file.toLowerCase(),
      base: path.basename(file.toLowerCase(), path.extname(file.toLowerCase())),
      ext: path.extname(file.toLowerCase()),
    }));

    if (inputExtension) {
      const exactMatch = normalizedFiles.find((file) => file.lower === normalizedInput);
      if (exactMatch) {
        return path.posix.join(folderPath, exactMatch.original);
      }
    }

    for (const ext of supportedExtensions.map((ext) => ext.toLowerCase())) {
      const match = normalizedFiles.find(
        (file) => file.base === inputBaseName && file.ext === ext
      );
      if (match) {
        return path.posix.join(folderPath, match.original);
      }
    }

    const baseMatch = normalizedFiles.find((file) => file.base === inputBaseName);
    if (baseMatch) {
      return path.posix.join(folderPath, baseMatch.original);
    }

    return null;
  } catch (error) {
    return null;
  }
}

function getFullAssetPath(assetPath, sheetName, assetsDir, supportedExtensions, assetType = 'images') {
  if (!assetPath) return null;

  const normalizedPath = String(assetPath).trim();
  if (normalizedPath.startsWith('http://') || normalizedPath.startsWith('https://')) {
    return normalizedPath;
  }

  if (normalizedPath.includes(`${assetType}/`)) {
    const parts = normalizedPath.split(`${assetType}/`)[1];
    const fileName = parts.split('/').pop();
    const folder = `${assetType}/${parts.split('/').slice(0, -1).join('/')}`;
    return findFileWithExtensions(fileName, folder, assetsDir, supportedExtensions);
  }

  if (!normalizedPath.includes('/')) {
    return findFileWithExtensions(normalizedPath, `${assetType}/${sheetName}`, assetsDir, supportedExtensions);
  }

  const parts = normalizedPath.split('/');
  const fileName = parts.pop();
  const folderPath = `${assetType}/${sheetName}/${parts.join('/')}`;
  return findFileWithExtensions(fileName, folderPath, assetsDir, supportedExtensions);
}

function processAssetField(assetInput, sheetName, assetsDir, supportedExtensions, assetType = 'images') {
  if (!assetInput) return null;

  const assetPath = String(assetInput).trim();
  if (assetPath.startsWith('http://') || assetPath.startsWith('https://')) {
    return assetPath;
  }

  return getFullAssetPath(assetPath, sheetName, assetsDir, supportedExtensions, assetType);
}

module.exports = {
  findFileWithExtensions,
  getFullAssetPath,
  processAssetField,
};

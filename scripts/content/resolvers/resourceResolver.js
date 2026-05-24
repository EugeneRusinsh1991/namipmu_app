const fs = require('fs');
const path = require('path');

function findResourceWithExtensions(fileName, folderPath, assetsDir, supportedExtensions) {
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

function getFullResourcePath(resourcePath, sheetName, assetsDir, supportedExtensions, assetType = 'images') {
  if (!resourcePath) return null;

  const normalizedPath = String(resourcePath).trim();
  if (/^https?:\/\//i.test(normalizedPath)) {
    return normalizedPath;
  }

  if (normalizedPath.includes(`${assetType}/`)) {
    const parts = normalizedPath.split(`${assetType}/`)[1];
    const fileName = parts.split('/').pop();
    const folder = `${assetType}/${parts.split('/').slice(0, -1).join('/')}`;
    return findResourceWithExtensions(fileName, folder, assetsDir, supportedExtensions);
  }

  if (!normalizedPath.includes('/')) {
    return findResourceWithExtensions(normalizedPath, `${assetType}/${sheetName}`, assetsDir, supportedExtensions);
  }

  const parts = normalizedPath.split('/');
  const fileName = parts.pop();
  const folderPath = `${assetType}/${sheetName}/${parts.join('/')}`;
  return findResourceWithExtensions(fileName, folderPath, assetsDir, supportedExtensions);
}

function processResourceField(resourceInput, sheetName, assetsDir, supportedExtensions, assetType = 'images') {
  if (!resourceInput) return null;

  const normalizedValue = String(resourceInput).trim();
  if (/^https?:\/\//i.test(normalizedValue)) {
    return normalizedValue;
  }

  return getFullResourcePath(normalizedValue, sheetName, assetsDir, supportedExtensions, assetType);
}

module.exports = {
  findResourceWithExtensions,
  getFullResourcePath,
  processResourceField,
};

const { PATHS, SUPPORTED_IMAGE_EXTENSIONS } = require('./config');
const { findResourceWithExtensions, getFullResourcePath, processResourceField } = require('./resolvers/resourceResolver');

function findImageWithAnyExtension(fileName, folderPath) {
  return findResourceWithExtensions(fileName, folderPath, PATHS.assetsDir, SUPPORTED_IMAGE_EXTENSIONS);
}

function getFullImagePath(imagePath, sheetName) {
  return getFullResourcePath(imagePath, sheetName, PATHS.assetsDir, SUPPORTED_IMAGE_EXTENSIONS, 'images');
}

function processImageField(imageInput, sheetName) {
  return processResourceField(imageInput, sheetName, PATHS.assetsDir, SUPPORTED_IMAGE_EXTENSIONS, 'images');
}

module.exports = {
  findImageWithAnyExtension,
  getFullImagePath,
  processImageField,
};

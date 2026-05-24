const { PATHS, SUPPORTED_VIDEO_EXTENSIONS } = require('./config');
const { findResourceWithExtensions, getFullResourcePath, processResourceField } = require('./resolvers/resourceResolver');

function findVideoWithAnyExtension(fileName, folderPath) {
  return findResourceWithExtensions(fileName, folderPath, PATHS.assetsDir, SUPPORTED_VIDEO_EXTENSIONS);
}

function getFullVideoPath(videoPath, sheetName) {
  return getFullResourcePath(videoPath, sheetName, PATHS.assetsDir, SUPPORTED_VIDEO_EXTENSIONS, 'videos');
}

function processVideoField(videoInput, sheetName) {
  return processResourceField(videoInput, sheetName, PATHS.assetsDir, SUPPORTED_VIDEO_EXTENSIONS, 'videos');
}

module.exports = {
  findVideoWithAnyExtension,
  getFullVideoPath,
  processVideoField,
};

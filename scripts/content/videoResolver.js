const path = require('path');
const fs = require('fs');
const { PATHS, SUPPORTED_VIDEO_EXTENSIONS } = require('./config');

function findVideoWithAnyExtension(fileName, folderPath) {
  if (!fileName) return null;

  const fullFolderPath = path.join(PATHS.assetsDir, folderPath);
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

    for (const ext of SUPPORTED_VIDEO_EXTENSIONS.map((ext) => ext.toLowerCase())) {
      const match = normalizedFiles.find(
        (file) => file.base === inputBaseName && file.ext === ext,
      );
      if (match) {
        return path.posix.join(folderPath, match.original);
      }
    }

    const baseMatch = normalizedFiles.find((file) => file.base === inputBaseName);
    if (baseMatch) {
      return path.posix.join(folderPath, baseMatch.original);
    }
  } catch (e) {
    // Папка не существует или недоступна
  }

  return null;
}

function getFullVideoPath(videoPath, sheetName) {
  if (!videoPath) return null;

  const normalizedPath = String(videoPath).trim();
  if (normalizedPath.startsWith('http://') || normalizedPath.startsWith('https://')) {
    return normalizedPath;
  }

  if (normalizedPath.includes('videos/')) {
    const parts = normalizedPath.split('videos/')[1];
    const fileName = parts.split('/').pop();
    const folder = `videos/${parts.split('/').slice(0, -1).join('/')}`;
    return findVideoWithAnyExtension(fileName, folder);
  }

  if (!normalizedPath.includes('/')) {
    return findVideoWithAnyExtension(normalizedPath, `videos/${sheetName}`);
  }

  const parts = normalizedPath.split('/');
  const fileName = parts.pop();
  const folderPath = `videos/${sheetName}/${parts.join('/')}`;
  return findVideoWithAnyExtension(fileName, folderPath);
}

function processVideoField(videoInput, sheetName) {
  if (!videoInput) return null;

  const videoPath = String(videoInput).trim();
  if (videoPath.startsWith('http://') || videoPath.startsWith('https://')) {
    return videoPath;
  }

  return getFullVideoPath(videoPath, sheetName);
}

module.exports = {
  processVideoField,
};

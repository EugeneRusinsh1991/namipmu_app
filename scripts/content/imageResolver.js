const path = require('path');
const fs = require('fs');
const { PATHS, SUPPORTED_IMAGE_EXTENSIONS } = require('./config');

// Поиск картинки по имени с любым поддерживаемым расширением
function findImageWithAnyExtension(fileName, folderPath) {
  if (!fileName) return null;
  
  const fullFolderPath = path.join(PATHS.assetsDir, folderPath);
  
  // Если указано расширение, проверяем как есть
  const fileNameLower = fileName.toLowerCase();
  const hasExtension = SUPPORTED_IMAGE_EXTENSIONS.some(ext => fileNameLower.endsWith(ext));
  
  if (hasExtension) {
    const fullPath = path.join(fullFolderPath, fileName);
    if (fs.existsSync(fullPath)) {
      return path.posix.join(folderPath, fileName);
    }
    return null;
  }
  
  // Если нет расширения, ищем файл с этим именем и любым поддерживаемым расширением
  try {
    const files = fs.readdirSync(fullFolderPath);
    for (const ext of SUPPORTED_IMAGE_EXTENSIONS) {
      const targetFile = fileName + ext;
      if (files.some(f => f.toLowerCase() === targetFile.toLowerCase())) {
        return path.posix.join(folderPath, targetFile);
      }
    }
  } catch (e) {
    // Папка не существует
  }
  
  return null;
}

// Получение полного пути к картинке с автоматическим поиском по расширению
function getFullImagePath(imagePath, sheetName) {
  if (!imagePath) return null;
  
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  if (imagePath.includes('images/')) {
    const parts = imagePath.split('images/')[1];
    return findImageWithAnyExtension(parts.split('/').pop(), 'images/' + parts.split('/').slice(0, -1).join('/'));
  } else if (!imagePath.includes('/')) {
    return findImageWithAnyExtension(imagePath, `images/${sheetName}`);
  } else {
    const parts = imagePath.split('/');
    const fileName = parts.pop();
    const folderPath = `images/${sheetName}/${parts.join('/')}`;
    return findImageWithAnyExtension(fileName, folderPath);
  }
}

// Обработка одного поля с картинкой
function processImageField(imageInput, sheetName) {
  if (!imageInput) return null;
  
  if (imageInput.startsWith('http://') || imageInput.startsWith('https://')) {
    return imageInput;
  }
  
  const imagePath = getFullImagePath(imageInput, sheetName);
  if (imagePath) {
    return imagePath;
  }
  
  return null;
}

module.exports = {
  findImageWithAnyExtension,
  getFullImagePath,
  processImageField,
};

const path = require('path');
const fs = require('fs');
const { PATHS, SUPPORTED_IMAGE_EXTENSIONS } = require('./config');

// Поиск картинки по имени с любым поддерживаемым расширением и без учёта регистра
function findImageWithAnyExtension(fileName, folderPath) {
  if (!fileName) return null;

  const fullFolderPath = path.join(PATHS.assetsDir, folderPath);
  const normalizedInput = fileName.trim().toLowerCase();
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

    // Если ввели имя с расширением, сначала пробуем точное совпадение
    if (inputExtension) {
      const exactMatch = normalizedFiles.find((file) => file.lower === normalizedInput);
      if (exactMatch) {
        return path.posix.join(folderPath, exactMatch.original);
      }
    }

    // Ищем по базовому имени, игнорируя расширение и регистр.
    // Отдаём предпочтение поддерживаемым расширениям в порядке из config.
    for (const ext of SUPPORTED_IMAGE_EXTENSIONS.map((ext) => ext.toLowerCase())) {
      const match = normalizedFiles.find(
        (file) => file.base === inputBaseName && file.ext === ext
      );
      if (match) {
        return path.posix.join(folderPath, match.original);
      }
    }

    // Если ни одно из стандартных расширений не подошло, возвращаем любой совпадающий файл
    const baseMatch = normalizedFiles.find((file) => file.base === inputBaseName);
    if (baseMatch) {
      return path.posix.join(folderPath, baseMatch.original);
    }

    return null;
  } catch (e) {
    // Папка не существует или недоступна
    return null;
  }
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

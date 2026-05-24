/**
 * Конфигурация для скрипты восстановления резервных копий
 * Определяет, какие папки и файлы нужно резервировать и восстанавливать
 */

// Папки, которые резервируются и восстанавливаются
const DIRECTORIES_TO_BACKUP = ['src', 'assets', 'scripts'];

// Важные файлы, которые резервируются и восстанавливаются
const FILES_TO_BACKUP = ['package.json', 'app.json', 'tsconfig.json'];

// Файлы, которые проверяются при проверке целостности
const REQUIRED_ITEMS = [...DIRECTORIES_TO_BACKUP, ...FILES_TO_BACKUP];

module.exports = {
  DIRECTORIES_TO_BACKUP,
  FILES_TO_BACKUP,
  REQUIRED_ITEMS,
};

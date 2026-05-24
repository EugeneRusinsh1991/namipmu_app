const { createBackup } = require('./scripts/backup/core');

try {
  createBackup();
} catch (error) {
  console.error('❌ Ошибка при создании бекапа:', error.message);
  process.exit(1);
}

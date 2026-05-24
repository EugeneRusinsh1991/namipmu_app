const { restoreFromBackup } = require('./scripts/restore/core');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('❌ Ошибка: укажите путь к папке бекапа\n');
  console.log('Использование:');
  console.log('  npm run restore <путь_к_бекапу>\n');
  console.log('Пример:');
  console.log('  npm run restore ../na_mi_pmu_2026-05-07');
  process.exit(1);
}

const backupPath = path.resolve(args[0]);

try {
  restoreFromBackup(backupPath);
} catch (error) {
  console.error('❌ Ошибка при восстановлении:', error.message);
  process.exit(1);
}

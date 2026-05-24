const fs = require('fs');
const path = require('path');

function validateRequiredItems(requiredItems, baseDir) {
  let allGood = true;

  requiredItems.forEach((item) => {
    const itemPath = path.join(baseDir, item);
    if (fs.existsSync(itemPath)) {
      console.log(`  ✅ Найден: ${item}`);
    } else {
      console.log(`  ⚠️  ОТСУТСТВУЕТ: ${item}`);
      allGood = false;
    }
  });

  return allGood;
}

module.exports = {
  validateRequiredItems,
};

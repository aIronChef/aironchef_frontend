const fs = require('fs-extra');
const chalk = require('chalk');

module.exports = (filePath) => {
  try {
    const stats = fs.statSync(filePath);
    console.log(chalk.green(`File size: ${stats.size} bytes`));
  } catch (error) {
    console.error(chalk.red('Failed to check file size:'), error.message);
  }
};

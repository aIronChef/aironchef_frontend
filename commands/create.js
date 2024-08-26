const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { execSync } = require('child_process');

module.exports = async (projectName) => {
  const { category } = await inquirer.prompt([
    {
      type: 'list',
      name: 'category',
      message: 'Select project category',
      choices: ['Frontend', 'Backend']
    }
  ]);

  let framework;
  if (category === 'Frontend') {
    framework = await inquirer.prompt([
      {
        type: 'list',
        name: 'framework',
        message: 'Select frontend framework',
        choices: ['React', 'Vue']
      }
    ]);
  } else {
    framework = await inquirer.prompt([
      {
        type: 'list',
        name: 'framework',
        message: 'Select backend framework',
        choices: ['Spring', 'Node.js']
      }
    ]);
  }

  const projectPath = path.join(process.cwd(), projectName);
  fs.ensureDirSync(projectPath);

  // Frontend 템플릿 다운로드
  if (category === 'Frontend') {
    let template;

    if (framework.framework === 'React') {
      template = 'react-ts'; // TypeScript React 템플릿
    } else if (framework.framework === 'Vue') {
      template = 'vue'; // Vue 템플릿
    }

    // Vite를 사용하여 템플릿 다운로드
    console.log(chalk.blue('Downloading template...'));
    execSync(`npm create vite@latest ${projectName} --template ${template}`, { cwd: process.cwd(), stdio: 'inherit' });

  } else {
    // Backend 템플릿 다운로드
    if (framework.framework === 'Spring') {
      console.log(chalk.blue('Downloading Spring Boot template...'));
      execSync(`curl https://start.spring.io/starter.zip -d dependencies=web -d baseDir=${projectName} -o ${projectPath}/spring-boot.zip`, { cwd: process.cwd(), stdio: 'inherit' });
      execSync(`unzip ${projectPath}/spring-boot.zip -d ${projectPath}`, { cwd: process.cwd(), stdio: 'inherit' });
      fs.removeSync(path.join(projectPath, 'spring-boot.zip'));

    } else if (framework.framework === 'Node.js') {
      // 기본 Node.js 템플릿 설정
      console.log(chalk.blue('Initializing Node.js project...'));
      execSync(`npm init -y`, { cwd: projectPath, stdio: 'inherit' });
      fs.ensureFileSync(path.join(projectPath, 'index.js'));
      fs.writeFileSync(path.join(projectPath, 'index.js'), `console.log('Hello, Node.js!');`);
    }
  }

  console.log(chalk.green(`Project ${projectName} created with ${category} - ${framework.framework}`));
  console.log(chalk.blue('Next steps:'));
  console.log(chalk.blue(`1. cd ${projectName}`));
  console.log(chalk.blue('2. Open the project in your editor'));
  console.log(chalk.blue('3. Start developing!'));

  // AI 코드 리뷰를 위한 안내 메시지
  console.log(chalk.yellow('To review code using AI, run: aichef review-file <file-path>'));

  // .env 파일 복사
  const envSourcePath = path.join(__dirname, '..', '.env');
  const envDestPath = path.join(projectPath, '.env');
  try {
    fs.copyFileSync(envSourcePath, envDestPath);
    console.log(chalk.green('.env file copied to project directory'));
  } catch (error) {
    console.error(chalk.red('Failed to copy .env file:'), error.message);
  }
};

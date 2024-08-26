const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
const chalk = require('chalk');
const readline = require('readline');
require('dotenv').config();  // .env 파일의 환경 변수를 로드

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // .env 파일에서 API 키 설정
});

// 디렉토리 구조를 트리 형태로 변환하는 함수 (특정 디렉토리 제외)
const getDirectoryTree = (dirPath, prefix = '') => {
  let tree = '';
  const items = fs.readdirSync(dirPath);

  items.forEach((item, index) => {
    // 숨겨진 파일이나 폴더 제외
    if (item.startsWith('.') || item === 'node_modules') {
      return;
    }

    const itemPath = path.join(dirPath, item);
    const isLast = index === items.length - 1;
    const newPrefix = `${prefix}${isLast ? '└── ' : '├── '}`;
    const stats = fs.statSync(itemPath);

    tree += `${newPrefix}${item}\n`;
    if (stats.isDirectory()) {
      tree += getDirectoryTree(itemPath, prefix + (isLast ? '    ' : '│   '));
    }
  });

  return tree;
};

// 디렉토리 구조를 AI 서버에 보내고 설명을 받는 함수
const explainStructure = async (currentStructure, feature, lang) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `다음은 ${lang} 프로젝트의 디렉토리 구조입니다. 이 프로젝트는 ${feature}와 관련이 있습니다.\n\n${currentStructure}\n\n이 구조의 각 부분의 목적과 조직에 대한 설명을 제공해 주실 수 있나요?`
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error(chalk.red('설명을 받는 데 실패했습니다:'), error.message);
    return null;
  }
};

// 사용자 입력을 받는 함수
const promptUser = (question) => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

// explain-structure 명령어의 로직
const explainStructureCommand = async (options) => {
  const dirPath = process.cwd();  // 현재 디렉토리
  const currentStructure = getDirectoryTree(dirPath);

  const feature = options.feature || '알 수 없는 기능';
  const lang = options.lang || '알 수 없는 언어';

  console.log(chalk.blue('현재 디렉토리 구조:\n'), currentStructure);

  const explanation = await explainStructure(currentStructure, feature, lang);

  if (explanation) {
    console.log(chalk.green('AI 설명:\n'), explanation);
  }
};

module.exports = explainStructureCommand;
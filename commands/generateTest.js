const fs = require('fs'); 
const path = require('path');
const OpenAI = require('openai');
const chalk = require('chalk');
require('dotenv').config();  // .env 파일의 환경 변수를 로드

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // .env 파일에서 API 키 설정
});

// 코드로부터 테스트 코드를 생성하는 함수
const generateTestCode = async (code, lang) => {
  try {    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `다음 코드를 기반으로 단위 테스트 및 통합 테스트 코드를 작성해 주세요. 언어는 ${lang}입니다.\n\n코드:\n${code}`
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error(chalk.red('테스트 코드 생성에 실패했습니다:'), error.message);
    return null;
  }
};

// 테스트 코드 파일을 생성하는 함수
const createTestFile = (testCode, filePath) => {
  try {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, testCode, 'utf-8');
    console.log(chalk.green(`테스트 파일이 ${filePath}에 생성되었습니다.`));
  } catch (error) {
    console.error(chalk.red('테스트 파일 생성에 실패했습니다:'), error.message);
  }
};

// 사용자 입력을 받는 함수
const promptUser = (question) => {
  return new Promise((resolve) => {
    const rl = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};

module.exports = { generateTestCode, createTestFile, promptUser };
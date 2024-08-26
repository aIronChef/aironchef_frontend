const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = async (filePath, options) => {
  const { message } = options;

  try {
    // 파일 경로가 올바른지 확인
    if (!fs.existsSync(filePath)) {
      throw new Error(`파일이 존재하지 않습니다: ${filePath}`);
    }

    // 파일 내용 읽기
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    console.log(`split: ${filePath.split('.')[1]}`);

    const messages = [
      {"role": "system", "content": "You are a very smart developer in the world ever."},
      {"role": "user", "content": `${fileContent} 이 파일의 내용을 5줄로 번호를 매겨서 요약해서 리뷰해줘. 추가내용: ${message} 을 보고 참고해줘.`},
    ]

    const chatgpt = require('../utils/chatgpt');
    chatgpt.callChatgptApi(messages).then(response => {
      console.log(`AI suggestion: ${response}`);
    }).catch(error => {
        console.error(error);
    });


  } catch (error) {
    console.error(chalk.red('Failed to review file:'), error.message);
  }
};
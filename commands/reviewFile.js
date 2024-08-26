const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const OpenAI = require('openai');
require('dotenv').config();  // .env 파일의 환경 변수를 로드

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // .env 파일에서 API 키 설정
});

module.exports = async (filePath, options) => {
  const { message } = options;

  try {
    // 파일 경로가 올바른지 확인
    if (!fs.existsSync(filePath)) {
      throw new Error(`파일이 존재하지 않습니다: ${filePath}`);
    }

    // 파일 내용 읽기
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // AI에게 코드 리뷰 요청
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Please review the following code. Here is additional context: ${message}\n\nCode:\n${fileContent}`,
        },
      ],
    });

    // AI 응답 출력
    console.log(chalk.green('AI review response:'), response.choices[0].message.content);
  } catch (error) {
    console.error(chalk.red('Failed to review file:'), error.message);
  }
};
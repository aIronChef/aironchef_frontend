const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const OpenAI = require('openai');
require('dotenv').config();  // .env 파일의 환경 변수를 로드

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // .env 파일에서 API 키 설정
});

module.exports = async (reviewType) => {
  const reviewDir = path.join(process.cwd(), 'public');
  const reviewFilePath = path.join(reviewDir, 'dev.review.ts');

  // 디렉토리 존재하지 않을 경우 생성
  fs.ensureDirSync(reviewDir);

  fs.writeFileSync(reviewFilePath, '// AI review session started\n\n// Your review content goes here...');
  console.log(chalk.green(`AI review file created at ${reviewFilePath}`));

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Start an AI review session for the project type: ${reviewType}.`,
        },
      ],
    });

    console.log(chalk.green('AI response:'), response.choices[0].message.content);
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error(chalk.red('Rate limit exceeded. Please check your OpenAI usage and try again later.'));
    } else {
      console.error(chalk.red('Failed to start AI review:'), error.message);
    }
  }
};

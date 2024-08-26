const chalk = require('chalk');
const OpenAI = require('openai');
require('dotenv').config();  // .env 파일의 환경 변수를 로드

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // .env 파일에서 API 키 설정
});

module.exports = async (filePath, options) => {
  const { message } = options;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Please review the file at ${filePath}. Here is additional context: ${message}`,
        },
      ],
    });

    console.log(chalk.green('AI review response:'), response.choices[0].message.content);
  } catch (error) {
    console.error(chalk.red('Failed to review file:'), error.message);
  }
};

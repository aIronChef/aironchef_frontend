const chalk = require('chalk');
const OpenAI = require('openai');
require('dotenv').config();  // .env 파일의 환경 변수를 로드

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // .env 파일에서 API 키 설정
});

module.exports = async (fileName) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Suggest optimizations or bundle reductions for the file: ${fileName}.`,
        },
      ],
    });

    console.log(chalk.green('AI suggestion:'), response.choices[0].message.content);
  } catch (error) {
    console.error(chalk.red('Failed to get file bundle suggestions:'), error.message);
  }
};

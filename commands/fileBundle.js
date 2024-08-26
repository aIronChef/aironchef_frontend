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
          content: `다음 파일에 대해 최적화나 번들 축소에 대한 제안을 해주세요: ${fileName}.`,
        },
      ],
    });

    console.log(chalk.green('AI 제안:'), response.choices[0].message.content);
  } catch (error) {
    console.error(chalk.red('파일 번들 제안을 가져오는 데 실패했습니다:'), error.message);
  }
};

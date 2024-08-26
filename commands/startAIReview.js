const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

module.exports = async (reviewType) => {
  const reviewDir = path.join(process.cwd(), 'public');
  const reviewFilePath = path.join(reviewDir, 'dev.review.ts');

  // 디렉토리 존재하지 않을 경우 생성
  fs.ensureDirSync(reviewDir);

  // 리뷰 파일 생성
  fs.writeFileSync(reviewFilePath, '// AI review session started\n\n// Your review content goes here...');
  console.log(chalk.green(`AI review 파일이 ${reviewFilePath}에 생성되었습니다.`));

  try {
    const messages = [
      {
        role: "user",
        content: `프로젝트 유형: ${reviewType}에 대한 AI 리뷰 세션을 시작합니다.`,
      },
    ];
    const chatgpt = require('../utils/chatgpt');

    // OpenAI API 호출
    const res = chatgpt.callChatgptApi(messages).then(response => {
      console.log(`AI의 제안: ${response}`);
    }).catch(error => {
        console.error(error);
    });
    console.log(chalk.green('AI 응답:'), res);
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error(chalk.red('요청 속도 제한 초과. OpenAI 사용량을 확인하고 나중에 다시 시도해 주세요.'));
    } else {
      console.error(chalk.red('AI 리뷰를 시작하는 데 실패했습니다:'), error.message);
    }
  }
};
const chalk = require('chalk');

module.exports = async (feature, lang, manager) => {
  try {
    const messages = [
      {
        role: "user",
        content: `너는 ${lang} 언어의 아주 저명한 개발자야. ${feature} 기능을 구현하려고 해. ${lang} 언어를 사용하려고 하는데 괜찮은 패키지 있을까? 설치 명령어를 ${manager} 형식으로 알려줘`,
      },
    ]

    const chatgpt = require('../utils/chatgpt');

    const aiResponse = chatgpt.callChatgptApi(messages).then(response => {
      console.log(`AI suggestion: ${response}`);
    }).catch(error => {
        console.error(error);
    });

    console.log(chalk.green('AI 추천 패키지 목록:'));
    console.log(aiResponse);
    
  } catch (error) {
    console.error(chalk.red('패키지 추천 요청 실패:'), error.message);
  }
};
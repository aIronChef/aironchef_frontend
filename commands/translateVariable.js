const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

module.exports = async (koreanComm, options) => {
  const { Form } = options || "camel case";
  const content = `"${koreanComm}" 이런 변수 또는 함수가 필요해. 괜찮은 이름 ${Form}형식으로 추천해줘. 변수만 5개 추천해줘 다른 사족은 부치지마`;
  console.log(content);

  try {
    const messages = [
      {
        role: "system", 
        content: "You are a very sensitive smart developer in the world ever."
      },
      {
        role: "user",
        content: content,
      },
    ];

    const chatgpt = require('../utils/chatgpt');
  
    chatgpt.callChatgptApi(messages).then(response => {
      console.log(`AI suggestion: \n${response}`);
    }).catch(error => {
        console.error(error);
    });
  } catch (error) {
    console.error(chalk.red('Failed to recommend fileName:'), error.message);
  }
 
  
};

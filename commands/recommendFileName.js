const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

module.exports = async (filePath, options) => {
  const { form } = options;

  try {
    // 파일 경로가 올바른지 확인
    if (!fs.existsSync(filePath)) {
      throw new Error(`파일이 존재하지 않습니다: ${filePath}`);
    }
  
    // 파일 내용 읽기
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const filePathArr = filePath.split(".");
    extensionName = filePathArr[filePathArr.length-1];

    const messages = [
      {
        role: "system", 
        content: "You are a very smart developer in the world ever."
      },
      {
        role: "user",
        content: `${fileContent} 코드를 기반으로 파일명을 추천해줘. 번호를 매겨 5개만 알려줘. ${form}형식으로 알려줘. 설명은 제외해줘. 추천만해줘. only.`,
      },
    ];

    const chatgpt = require('../utils/chatgpt');
  
    chatgpt.callChatgptApi(messages).then(async response => {
      const recommendations = response.split('\n').filter((item) => item); // 번호별 추천 목록 추출
      recommendations.unshift("0. 변수이름 변경안함");
      
        // 사용자가 번호를 선택하도록 프롬프트
        const { selectedNumber } = await inquirer.prompt([
          {
            type: 'list',
            name: 'selectedNumber',
            message: 'Select a file name:',
            choices: recommendations,
          }
        ]);
    
        if (selectedNumber === "0. 변수이름 변경안함") {
          console.log(chalk.yellow("File name not changed."));
        } else {
          const selectedFileName = selectedNumber.split('. ')[1]// '1. 파일명'에서 파일명만 추출
    
          // 새로운 파일 경로 생성
          const newFilePath = path.join(path.dirname(filePath), selectedFileName + "." + extensionName);
    
          // 파일명 변경
          fs.renameSync(filePath, newFilePath);
    
          console.log(chalk.green(`File renamed to: ${selectedFileName}`));
        }    
    }).catch(error => {
        console.error(error);
    });
  } catch (error) {
    console.error(chalk.red('Failed to recommend fileName:'), error.message);
  }
};

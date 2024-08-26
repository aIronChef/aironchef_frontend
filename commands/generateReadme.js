const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { OpenAI } = require('openai');
require('dotenv').config();  // .env 파일의 환경 변수를 로드

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // .env 파일에서 API 키 설정
});

// 프로젝트의 모든 파일과 내용을 가져오는 함수 (내용 제한 및 .env 파일 제외)
const getAllFilesContent = (dirPath) => {
  let filesContent = '';

  const getFiles = (currentPath) => {
    const files = fs.readdirSync(currentPath);
    files.forEach(file => {
      const filePath = path.join(currentPath, file);
      // .env 파일을 제외합니다.
      if (file === '.env') return;

      if (fs.statSync(filePath).isDirectory()) {
        getFiles(filePath);
      } else {
        let fileContent = fs.readFileSync(filePath, 'utf-8');
        // 파일 내용이 너무 크면 제한을 걸어 요약을 시도합니다.
        if (fileContent.length > 10000) { // 예를 들어, 10,000자로 제한
          fileContent = fileContent.substring(0, 10000) + '... (내용이 생략되었습니다)';
        }
        filesContent += `\n### ${filePath}\n\`\`\`\n${fileContent}\n\`\`\`\n`;
      }
    });
  };

  getFiles(dirPath);
  return filesContent;
};

// README.md 파일 생성을 요청하는 함수
const generateReadme = async (projectName, projectContent, projectLanguage, projectVersion, projectFeatures) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {"role": "system", "content": "You are a very smart developer in the world ever."},
        {
          role: 'user',
          content: `다음 정보를 바탕으로 프로젝트 이름이 "${projectName}"인 README.md 파일을 생성해 주세요:

                    1. 프로젝트 구조:
                    ${projectContent.substring(0, 10000)}... (내용이 생략되었습니다) 

                    2. 프로젝트 언어:
                    ${projectLanguage}

                    3. 프로젝트 버전:
                    ${projectVersion}

                    4. 기능 설명:
                    ${projectFeatures}

                    README.md 파일을 전문적이고 읽기 쉬운 형식으로 마크다운 형식으로 작성해 주세요. 각 항목은 제목을 붙여서 구분하고, 필요한 경우 하위 항목이나 코드 블록으로 세부 정보를 명확하게 표현해 주세요.`,
        },
      ],
    });

    console.log(response.choices[0].message.content);
    return response.choices[0].message.content;
  } catch (error) {
    console.error(chalk.red('README.md 내용 생성에 실패했습니다:'), error.message);
    return null;
  }
};

// README.md 파일 생성 함수
const createReadmeFile = (readmeContent, filePath) => {
  try {
    fs.outputFileSync(filePath, readmeContent, 'utf-8');
    console.log(chalk.green(`README.md 파일이 ${filePath}에 생성되었습니다.`));
  } catch (error) {
    console.error(chalk.red('README.md 파일 생성에 실패했습니다:'), error.message);
  }
};

// 사용자 입력을 받는 함수
const promptUser = (question) => {
  return new Promise((resolve) => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    readline.question(question, (answer) => {
      readline.close();
      resolve(answer);
    });
  });
};

// 명령어 함수
const generateReadmeCommand = async () => {
  const projectDir = process.cwd(); // 현재 디렉토리
  const projectName = path.basename(projectDir);
  const projectContent = getAllFilesContent(projectDir);

  // 사용자에게 추가적인 정보 입력 받기
  const projectLanguage = await promptUser('프로젝트의 프로그래밍 언어를 입력해 주세요: ');
  const projectVersion = await promptUser('프로젝트의 버전을 입력해 주세요: ');
  const projectFeatures = await promptUser('프로젝트의 기능을 설명해 주세요: ');

  console.log(chalk.blue('README.md 내용 생성 중...'));

  const readmeContent = await generateReadme(projectName, projectContent, projectLanguage, projectVersion, projectFeatures);

  if (readmeContent) {
    console.log(chalk.green('생성된 README.md 내용:\n'), readmeContent);
    const userResponse = await promptUser('README.md 파일을 생성하거나 덮어쓰시겠습니까? (yes/no): ');

    if (userResponse.toLowerCase() === 'yes') {
      const outputPath = path.join(projectDir, 'README.md');
      createReadmeFile(readmeContent, outputPath);
    } else {
      console.log('README.md 파일이 생성되지 않았습니다.');
    }
  }
};

module.exports = { generateReadmeCommand };
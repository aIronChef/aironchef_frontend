#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');  // fs 모듈 불러오기
const path = require('path');  // path 모듈 불러오기
const createProject = require('../commands/create');
const startReview = require('../commands/startAIReview');
const reviewFile = require('../commands/reviewFile');
const checkFileSize = require('../commands/checkoutFile');
const fileBundle = require('../commands/fileBundle');
const recommendPackages = require('../commands/recommendPackages');
const explainStructureCommand = require('../commands/explainStructure');
const { generateTestCode, createTestFile, promptUser } = require('../commands/generateTest');
const recommendFileName = require('../commands/recommendFileName');
const translateVariable = require('../commands/translateVariable');
const { generateReadmeCommand } = require('../commands/generateReadme'); 

program
  .name('aichef')
  .description('AI 기반 CLI 도구입니다.')
  .version('1.0.0');

program
  .command('create <project-name>')
  .description('새 프로젝트를 생성합니다.')
  .action(createProject);

program
  .command('start-review <review-type>')
  .description('AI 리뷰 세션을 시작합니다.')
  .action(startReview);

program
  .command('review-file')
  .description('파일에 대한 코드 리뷰를 요청합니다.')
  .argument('<filePath>', '리뷰할 파일의 경로')
  .option('-m, --message <message>', '추가적인 컨텍스트 메시지')
  .action(async (filePath, options) => {
    await reviewFile(filePath, options);
  });

program
  .command('check-size <file-path>')
  .description('파일의 크기를 확인합니다.')
  .action(checkFileSize);

program
  .command('bundle-file <file-name>')
  .description('AI로부터 파일 번들 제안을 받습니다.')
  .action(fileBundle);

program
  .command('recommend-packages')
  .description('기능에 필요한 패키지를 추천받습니다.')
  .option('-f, --feature <feature>', '구현하려는 기능 설명')
  .option('-l, --lang <lang>', '사용할 프로그래밍 언어')
  .option('-m, --manager <manager>', '패키지 관리 도구 (npm/yarn)')
  .action(async (options) => {
    const { feature, lang, manager } = options;
    await recommendPackages(feature, lang, manager);
  });

program
  .command('explain-structure')
  .description('현재 디렉토리 구조를 설명합니다.')
  .option('-f, --feature <feature>', '기능 설명')
  .option('-l, --lang <lang>', '프로그래밍 언어')
  .action(explainStructureCommand);

program
  .command('generate-tests')
  .description('주어진 코드로부터 테스트 코드를 생성합니다.')
  .option('-f, --file <file>', '테스트할 코드 파일의 경로')
  .option('-l, --lang <language>', '코드의 프로그래밍 언어')
  .action(async (options) => {
    const { file, lang } = options;

    if (!file) {
      console.error('파일 경로를 제공해 주세요.');
      return;
    }

    try {
      const code = fs.readFileSync(file, 'utf-8'); // fs 모듈을 사용하여 파일 읽기
      const testCode = await generateTestCode(code, lang);

      if (testCode) {
        console.log('생성된 테스트 코드:\n', testCode);
        const userResponse = await promptUser('테스트 파일을 생성하시겠습니까? (yes/no): ');

        if (userResponse.toLowerCase() === 'yes') {
          const outputPath = path.join('testfile', path.basename(file).replace('.js', '.test.js'));
          createTestFile(testCode, outputPath); // 파일 경로를 올바르게 지정하여 파일 생성
        } else {
          console.log('테스트 파일이 생성되지 않았습니다.');
        }
      }
    } catch (error) {
      console.error('파일을 읽거나 테스트 코드를 생성하는 중 오류가 발생했습니다:', error.message);
    }
  });

// type: snack case, camel case
// aiche recom-file-name --form "snack case" ./commands/create.js
program
.command('recom-file-name <file-name>')
.description('AI로 파일이름을 추천합니다.')
.option('-f, --form <form>', 'what type for file name')
.action(recommendFileName);

// aiche trans-var -f "camel case"  "디렉토리 구조를 트리 형태로 변환하는 함수"
program
.command('trans-var <var-name>')
.description('한국어로 설명된 변수명을 영어로 번역하여 추천합니다.')
.option('-f, -form <form>', 'what type for variable name')
.action(translateVariable);

program
  .command('generate-readme')
  .description('프로젝트의 모든 파일을 기반으로 README.md 파일을 생성합니다.')
  .action(async () => {
    try {
      await generateReadmeCommand();
    } catch (err) {
      console.error(chalk.red('명령어 실행 중 오류 발생:'), err.message);
    }
  });
  
program.parse(process.argv);

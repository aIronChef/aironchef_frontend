# aironchef_frontend
'AIronChef'는 개발자들이 효율적으로 일관된 코드를 작성하고 프로젝트를 관리할 수 있
도록 돕는 확장 CLI프로그램입니다

<div>
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/ollama-000000?style=for-the-badge&logo=ollama&logoColor=white">
  <img src="https://img.shields.io/badge/openai-412991?style=for-the-badge&logo=openai&logoColor=white">
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
</div>

<br />
<br />

## 기획 배경

소프트웨어 산업이 점점 발달하면서, 개발자들은 높은 품질의 코드를 유지하면서 다양한
작업을 처리해야 했습니다. 이 과정에서 코드 품질 보장과 파일 관리 등 반복적인 작업에
많은 시간이 소모되는 문제를 경험했습니다. 특히 팀 프로젝트를 진행하면서 협업과 관리
의 복잡성이 더해져, 다음과 같은 여러 가지 문제를 겪게 되었습니다.

1. 코딩 스타일의 차이 : 팀원 간의 코드 스타일 차이로 인해 코드 일관성이 부족하고 관
리가 어려워 코드 리뷰에 많은 시간이 소요되었습니다.
2. 코드 리뷰의 비효율성: 코드 작성보다 다른 사람의 코드를 읽고 피드백을 주는 데 시간
이 더 걸려 프로젝트 진행에 어려움을 주었습니다.
3. 성능저하 : 프로젝트가 커지면서 파일 크기가 증가하고 성능이 떨어졌으며, 이를 해결
하기 위한 최적화 과정에서 많은 시간이 소모되었습니다.

이러한 문제를 해결하기 위해 개발한 것이 바로 'AIronChef' 프로젝트입니다.
'AIronChef'는 작업을 자동화하고 효율적으로 수행할 수 있도록 설계되었으며, AI를 활
용해 코드 품질을 향상시키고 개발 프로세스를 간소화하는 데 중점을 두고 있습니다

<br />
<br />

## 기능

1. 프로젝트 생성 (aichef create <project-name>) 
새로운 프로젝트를 생성하여, 카테고리와 프레임워크를 선택해 템플릿을 설정
2. AI 리뷰 세션 시작 (aichef start-review <review-type>)
AI 기반 코드 리뷰 세션 시작. 지정된 리뷰 유형에 따라 AI 리뷰 파일을 생성하
고, 관련 정보와 리뷰 세션을 안내
3. 파일 리뷰 (aichef review-file <filePath>)
지정한 파일에 대해 AI로 코드 리뷰 요청 및 파일 내용 분석 및 요약
4. 파일 크기 확인 (aichef check-size <file-path>)
지정한 파일의 크기를 확인하고 출력
5. 파일 번들 제안 (aichef bundle-file <file-name>)
지정한 파일에 대해 AI로부터 코드 최적화나 번들 축소 제안
6. 패키지 추천 (aichef recommend-packages)
특정 기능과 프로그래밍 언어에 기반하여 필요한 패키지를 추천
7. 디렉토리 구조 설명 (aichef explain-structure)
현재 디렉토리의 구조를 트리 형태로 출력 및 구조의 목적과 조직 설명
8. 테스트 코드 생성 (aichef generate-tests)
지정한 코드 파일에 대해 단위 테스트 및 통합 테스트 코드를 AI를 통해 생성
9. 파일 이름 추천 (aichef recom-file-name <file-name>)
지정한 파일에 대해 AI로부터 파일 이름을 추천
10. 변수, 함수명 번역 (aichef trans-var <var-name>)
한국어로 설명된 변수명을 영어로 번역하여 추천

<br />
<br />

## 프로젝트 구조도

![image](https://github.com/user-attachments/assets/e8e9cb98-565b-4a8e-b2fc-f28de62347eb)

<br />
<br />

## 향후 계획

1. 기능 추가 
사용자 피드백을 반영하여 새로운 기능들을 추가해 나갈 예정입니다.
2. 성능 개선 
기존 기능의 성능을 최적화하여, 새로운 기술 스택을 계속 도입해 나갈 예정입니다.
3. 다국어 지원 
여러 언어를 지원하여 글로벌 사용자가 접근할 수 있도록 할 예정입니다.
4. npm 배포
많은 사용자들이 aichef를 사용할 수 있도록 npm 배포를 진행할 예정입니다

<br />
<br />

# 팀원

[김유진]([https://github.com/](https://github.com/youjin0411))
[박선주](https://github.com/55soup)

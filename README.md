# aironchef_frontend

## 프로젝트 구조

- **COMMIT_EDITMSG 경로:**
  ```
  feat: 파일명추천, 변수명 번역
  ```

- **FETCH_HEAD 경로:**
  ```
  3bb056b77faa920b085487d8e250b55979463adf    branch 'main' of https://github.com/aIronChef/aironchef_frontend
  ```

- **HEAD 경로:**
  ```
  ref: refs/heads/main
  ```

- **ORIG_HEAD 경로:**
  ```
  56b6f37792ab2c79dee1497ce718fa733c2b547e
  ```

- **config 경로:**
  ```
  [core]
  	repositoryformatversion = 0
  	filemode = true
  	bare = false
  	logallrefupdates = true
  	ignorecase = true
  	precomposeunicode = true
  [remote "origin"]
  	url = https://github.com/aIronChef/aironchef_frontend.git
  	fetch = +refs/heads/*:refs/remotes/origin/*
  [branch "main"]
  	remote = origin
  	merge = refs/heads/main
  	vscode-merge-base = origin/main
  ```

- **description 경로:**
  ```
  Unnamed repository; edit this file 'description' to name the repository.
  ```

- **applypatch-msg.sample 경로:**
  ```sh
  #!/bin/sh
  #
  # An example hook script to check the commit log message taken by
  # applypatch from an e-mail message.
  #
  # The hook should exit with non-zero status after issuing an
  # appropriate message if it wants to stop the commit.  The hook is
  # allowed to edit the commit message file.
  #
  # To enable this hook, rename this file to "applypatch-msg".
  .
  git-sh-setup
  commitmsg="$(git rev-parse --git-path hooks/commit-msg)"
  test -x "$commitmsg" && exec "$commitmsg" ${1+"$@"}
  :
  ```

- **commit-msg.sample 경로:**
  ```sh
  #!/bin/sh
  #
  # An example hook script to check the commit log message.
  # Called by "git commit" with one argument, the name of the file
  # that has the commit message.  The hook should exit with non-zero
  # status after issuing an appropriate message if it wants to stop the
  # commit.  The hook is allowed to edit the commit message file.
  #
  # To enable this hook, rename this file to "commit-msg".
  .
  .
  .
  ```

## 프로젝트 정보

- **프로젝트 언어:** js

- **프로젝트 버전:** 22.2.0

- **기능 설명:** 
  CLI AI 프레임워크로, 프로젝트 관리를 조금 더 용이하게 해줍니다. 기능으로는 JS 파일 번들 체크, 프로젝트 생성, 파일 구조 설정, README 문서 파일 생성, 파일 이름 추천, 파일 리뷰, 테스트 코드 생성 등이 있습니다.
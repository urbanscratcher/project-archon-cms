# ArchOn Admin

2023년 11월 ~ 2024년 2월 (3개월)

- 가상의 ArchOn 매거진 사이트의 관리자용 사이트로, 리액트를 통해 SPA로 구현했습니다. 리액트와 UI 컴포넌트 만들기에 숙달하고, 하나의 사이트를 처음부터 구축해 보기 위해 진행한 풀스택 프로젝트입니다.

## 주요 기능

- **로그인 & 회원가입**
  - 이메일, 패스워드로 로그인 할 수 있습니다.
  - 이름, 이메일, 패스워드 및 패스워트 확인으로 회원가입이 가능합니다.
  - 입력값의 유효성을 검사하고, 에러 메시지를 띄웁니다.
- **인증**
  - localStorage에 JWT 액세스 토큰이 저장되고, httpOnly 쿠키는 리프레시 토큰을 가집니다.
  - 사이트를 이용할 때마다 헤더에 토큰을 함께 전달하고, 인증 에러시 로그인 페이지로 전환됩니다.
- **인가**
  - 권한별로 사용할 수 있는 기능 제한합니다 (구현율 20%).
    - 권한: 어드민, 에디터(사이트 관리자), 작가, 일반 사용자
  - 본 사이트는 어드민, 에디터, 작가만 사용 가능한 것으로 제한했습니다.
- **사용자 관리**
  - 사용자의 이름, 권한, 이메일, 글 분야(토픽), 가입일 목록을 볼 수 있습니다.
  - 이름과 이메일로 검색, 권한별 필터링, 페이징이 가능합니다.
  - 목록에서 바로 사용자의 권한을 수정할 수 있습니다.
- **토픽 관리**: 토픽(카테고리) 추가, 이름 및 순서 변경이 가능합니다.
- **헤드라인 선정**: 기사 중 헤드라인과 서브 헤드라인으로 사용할 글을 선정할 수 있습니다.
- **기사 작성**: 기사 열람, 쓰기, 편집, 삭제가 가능합니다.
- **계정 관리**: 아바타 설정, 경력 작성, 비밀번호 재설정 등 프로필 및 계정 정보를 수정할 수 있습니다.
- **UI 조정**: 폰트 설정, 폰트 크기 설정이 가능하며 다크 모드를 지원합니다.

## 기술적 중점 사항

## 시연
1. 회원가입 및 로그인
<video src="https://github.com/urbanscratcher/project-archon-cms/assets/17016494/170e361f-c1a2-4c92-8aac-646e02608363" controls></video>

2. 사용자 관리
<video src="https://github.com/urbanscratcher/project-archon-cms/assets/17016494/6b4e4843-6184-4eb2-abb4-fe9cb4066d1d" controls></video>

3. 헤드라인 선정 및 기사 관리
<video src="https://github.com/urbanscratcher/project-archon-cms/assets/17016494/a5c151fe-f05a-4b7d-8494-dcccac5810d0" controls></video>

4. 기사 작성
<video src="https://github.com/urbanscratcher/project-archon-cms/assets/17016494/7a1a58da-cfb3-493f-b517-9a0a941df87e" controls></video>

5. 토픽 관리
<video src="https://github.com/urbanscratcher/project-archon-cms/assets/17016494/884c6258-3b3f-41e3-afa6-eae220769a21" controls></video>

6. 계정 및 UI 설정
<video src="[https://github.com/urbanscratcher/project-archon-cms/assets/17016494/884c6258-3b3f-41e3-afa6-eae220769a21](https://github.com/urbanscratcher/project-archon-cms/assets/17016494/f1e10262-a6a0-42fd-b33c-ae3626ec3aa6)" controls></video>

## 기술 구성

- React + TypeScript w/ Vite
- 라우팅: React Router
- 스타일링: TailwindCSS
- 원격 상태 관리: Tanstack React Query
- UI 상태 관리:
  - Context API
  - Zustand
- 폼 관리: React Hook Form
- 타입 체크: Zod (w/ hookform/resolvers)
- 아이콘: Iconify (icon set: Lucide)
- 날짜: Date-fns
- 서버 통신: Axios
- 암호화: Crypto-js (for AES256 encryption)
- 참고한 UI 스타일링: Shadcn/ui, Radix 기반
- 개발 도구: VSCode, Docker, GitHub Copilot, Console Ninja, Redux DevTools, Eslint, Prettier


## 참고 자료

- Udemy - The Ultimate React Course 2024: React, Redux & More
  (https://www.udemy.com/course/the-ultimate-react-course)
- Udemy - React Query : React로 서버 상태 관리하기(https://www.udemy.com/course/react-query-react)
- Udemy -
  React 완벽 가이드 with Redux, Next.js, TypeScript(https://www.udemy.com/course/best-react)
- Udemy - React & TypeScript - The Practical Guide
  (https://www.udemy.com/course/react-typescript-the-practical-guide)
- Useful Custom hooks by Web Dev Simplified(https://github.com/WebDevSimplified/useful-custom-react-hooks/tree/main)

---

## 회고

- 원래의 매거진 사이트는 조금 키치하면서 포멀한 느낌으로 세리프체로 헤드라인을 정하고, 울트라 마린을 베이스로 한 쨍한 색감을 사용했는데 cms 사이트는 차분하고 중립적인 느낌을 주었다
  - 로고 폰트가 다른 게 너무 거슬리긴 하지만 통일성을 위해 타협
- MUI나 Ant Design의 UI를 사용해볼까 하던 차에 shadcn/ui의 기본 스타일링이 너무 마음에 들어서 이걸 베이스로 ui 컴포넌트들을 만들었다.
  - shadcn/ui가 베이스로 한 Radix라는 헤드리스 UI를 알게 되었고, 원래의 매거진 사이트는 이미 디자인 시스템을 만들어 둔 터라 이걸 적용해 볼 것 같다.
  - 헤드리스 UI 라이브러리들의 문서를 보면 유연해서 좋기도 하지만, 컴포넌트 컴포짓 패턴에도 많은 공부가 되었다.
  - 드롭다운, 테이블은 여러 시나리오에서 잘 보이도록 개발하기가 생각보다 빡쎄다..


# ArchOn CMS

- 가상의 ArchOn 매거진 사이트 관리 및 글 업로드 사이트
- SEO가 필요 없는 관리자용 사이트를 SPA로 구현
- 리액트에 숙달되고, UI 컴포넌트들의 구조를 파악하며 처음부터 빌딩해 보기 위한 프로젝트

## 기능

- 로그인 & 회원가입
  - 이메일, 패스워드로 로그인
  - 이름, 이메일, 패스워드 및 패스워트 확인으로 회원가입 가능
  - 입력값 유효성 검사
- 인증
  - 로컬에는 JWT 액세스 토큰이 저장되고, httpOnly 쿠키는 리프레시 토큰을 가짐
  - 사용자 이벤트시 헤더에 토큰을 함께 전달하고, 에러시 로그인 페이지로 전환됨
- 인가
  - 권한별로 사용할 수 있는 기능 제한
    - 권한: 어드민, 에디터(사이트 관리자), 작가, 일반 사용자
  - 본 사이트는 어드민, 에디터, 작가만 사용 가능한 것으로 제한
- 어드민 기능
  - 사용자들의 이름, 권한, 이메일, 글 분야(토픽), 가입일을 볼 수 있음
    - 이름과 이메일로 검색, 권한별 필터링, 페이징이 가능
    - 목록에서 권한을 바로 업데이트 할 수 있음
  - 대시보드에서 신규 회원 목록, 신규 글을 볼 수 있음
  - 그외 모든 권한
- 에디터 기능
  - 사용자 정보, 작가 글은 열람만 가능
  - 토픽 추가, 이름 및 순서 변경 가능
  - 작가들의 글 중 커버로 사용할 글을 선정할 수 있음
  - 대시보드에서 신규 회원 목록, 신규 글을 볼 수 있음
  - 자기 계정 설정
- 작가 기능
  - 자신의 글만 열람, 쓰기, 편집, 삭제 가능
  - 대시보드에서 자신의 글에 대한 반응을 확인할 수 있음
  - 자기 계정 설정
- 그외: 다크 모드 지원

## 사용 기술 & 라이브러리

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

## 개발 여담

- 원래의 매거진 사이트는 조금 키치하면서 포멀한 느낌으로 세리프체로 헤드라인을 정하고, 울트라 마린을 베이스로 한 쨍한 색감을 사용했는데 cms 사이트는 차분하고 중립적인 느낌을 주었다
  - 로고 폰트가 다른 게 너무 거슬리긴 하지만 통일성을 위해 타협
- MUI나 Ant Design의 UI를 사용해볼까 하던 차에 shadcn/ui의 기본 스타일링이 너무 마음에 들어서 이걸 베이스로 ui 컴포넌트들을 만들었다.
  - shadcn/ui가 베이스로 한 Radix라는 헤드리스 UI를 알게 되었고, 원래의 매거진 사이트는 이미 디자인 시스템을 만들어 둔 터라 이걸 적용해 볼 것 같다.
  - 헤드리스 UI 라이브러리들의 문서를 보면 유연해서 좋기도 하지만, 컴포넌트 컴포짓 패턴에도 많은 공부가 되었다.
  - 드롭다운, 테이블은 여러 시나리오에서 잘 보이도록 개발하기가 생각보다 빡쎄다..

## 참고 자료

- Udemy - The Ultimate React Course 2024: React, Redux & More
  (https://www.udemy.com/course/the-ultimate-react-course)
- Udemy - React Query : React로 서버 상태 관리하기(https://www.udemy.com/course/react-query-react)
- Udemy -
  React 완벽 가이드 with Redux, Next.js, TypeScript(https://www.udemy.com/course/best-react)
- Udemy - React & TypeScript - The Practical Guide
  (https://www.udemy.com/course/react-typescript-the-practical-guide)
- Useful Custom hooks by Web Dev Simplified(https://github.com/WebDevSimplified/useful-custom-react-hooks/tree/main)

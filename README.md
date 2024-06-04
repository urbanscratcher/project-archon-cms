# ArchOn Admin

November 2023 - February 2024 (3 months)

ArchOn Admin is a fictional magazine website admin site built using React as a single-page application (SPA). This project was a full-stack endeavor undertaken to gain experience in React and UI component development while building a website from scratch.

## Features

- **Login & Registration**
  - Users can log in using their email and password.
  - Registration allows users to create an account with their name, email, password, and password confirmation.
  - Input validation checks and error messages are implemented.
- **Authentication**
  - JWT access tokens are stored in localStorage, while httpOnly cookies hold refresh tokens.
  - Tokens are sent along with each request to the site. In case of authentication errors, users are redirected to the login page.
- **Authorization**
  - Feature access is restricted based on user roles (20% implemented).
  - Roles include admin, editor (site manager), author, and regular user.
  - This site is currently restricted to admins, editors, and authors.
- **User Management**
  - Users can view a list of users with their names, roles, emails, writing topics, and registration dates.
  - Searching by name and email, filtering by role, and paging are available.
  - User roles can be edited directly from the list.
- **Topic Management**: Topics (categories) can be added, renamed, and their order adjusted.
- **Headline Selection**: Articles can be selected as headlines and subheadlines.
- **Article Management**: Articles can be viewed, written, edited, and deleted.
- **Account Management**: Users can set their avatar, write their career history, and reset their password.
- **UI Customization**: Font and font size can be customized, and dark mode is supported.

## Technical Focus
- This project focused on creating functional UI components (drop-down menus, tables, drag-and-drop lists) from scratch.
- I considered component design principles and structures to enhance component reusability.
- Through small-scale development and manual testing, I reflected on UX and incorporated improvements.

## Demo
1. Login & Registration
<video src="https://github.com/urbanscratcher/project-archon-cms/assets/17016494/170e361f-c1a2-4c92-8aac-646e02608363" controls></video>

2. User Management
<video src="https://github.com/urbanscratcher/project-archon-cms/assets/17016494/6b4e4843-6184-4eb2-abb4-fe9cb4066d1d" controls></video>

3. Headline Selection and Article Management
<video src="https://github.com/urbanscratcher/project-archon-cms/assets/17016494/a5c151fe-f05a-4b7d-8494-dcccac5810d0" controls></video>

4. Article Writing
<video src="https://github.com/urbanscratcher/project-archon-cms/assets/17016494/7a1a58da-cfb3-493f-b517-9a0a941df87e" controls></video>

5. Topic Management
<video src="https://github.com/urbanscratcher/project-archon-cms/assets/17016494/884c6258-3b3f-41e3-afa6-eae220769a21" controls></video>

6. Account and UI Setting
<video src="https://github.com/urbanscratcher/project-archon-cms/assets/17016494/b0317209-35e9-4740-90ad-c7ef8163b751" controls></video>


[Visit the Site](https://project-archon-cms.vercel.app/)

## Tech Stack
### Frontend
- **Library**: React
- **Langauge**: TypeScript
- **Styling**: TailwindCSS
- **Remote State Management**: Tanstack React Query
- **UI State Management**: Context API, Zustand
- **Form State Management**: React Hook Form
- **Type Check**: Zod, hookform/resolvers
- **Icon Pack**: Iconify (Lucide)
- **Backend Communication**: Axios
- **Etc**: Date-fns, Crypto-js for AES256 Encryption

### Backend
#### Archon API
- [Go to the GitHub](https://github.com/urbanscratcher/project-archon-api)
- **Library**: Express, Node.js
- **Database**: MariaDB
- **Logging**: Pino, Pino-http
- **Security**: Express-rate-limit, Xss, Helmet, Hpp, Bcrypt 등
- **API Test**: Postman

### Development Environment
- **Source Code**: GitHub
- **Build Tool**: Vite
- **Design**: figma
- **Etc**: VSCode, GitHub Copilot, Console Ninja, Redux Devtools, Eslint, Prettier

### Cloud Services and Deployment
- **Backend Hosting and Deployment**: Oracle Cloud, Docker, Nginx (개인 도메인으로 연결)
- **Frontend Hosting and Deployment**: Vercel

## Data Design
<img src="https://github.com/urbanscratcher/project-archon-cms/assets/17016494/9002b34c-0797-4495-b2d4-ff48c5b99ac8" />

## Reference

- [Udemy - The Ultimate React Course 2024: React, Redux & More](https://www.udemy.com/course/the-ultimate-react-course)
- [Udemy - React Query : React로 서버 상태 관리하기](https://www.udemy.com/course/react-query-react)
- [Udemy -
  React 완벽 가이드 with Redux, Next.js, TypeScript](https://www.udemy.com/course/best-react)
- [Udemy - React & TypeScript - The Practical Guide](https://www.udemy.com/course/react-typescript-the-practical-guide)
- [Useful Custom hooks by Web Dev Simplified](https://github.com/WebDevSimplified/useful-custom-react-hooks/tree/main)
- Component Styling Reference: Shadcn/ui, Radix

---

## Reflection

- While the original magazine site used vibrant colors, the admin site employs a calm and neutral blue palette.
- Initially considering UI libraries like MUI or Ant Design, I was drawn to the basic styling of shadcn/ui and built UI components based on it.
- Discovering the headless UI Radix based on shadcn/ui, I plan to apply it to the original magazine site's existing design system.
- Headless UI libraries offer flexibility and aided in understanding the component composition pattern.
- Developing dropdowns and tables for various screen sizes posed significant challenges.

## Next
- Organize complex logic introduced by feature additions and removals.
- Enhance authorization features.
- Review and fix bugs in image uploading and article editing.
- Define and display various error scenarios.
- Rename the project from "cms" to "admin" to reflect broader management


# ArchOn Admin

- Management and article upload site for the fictional ArchOn magazine site
- Implemented as an SPA for an admin site that does not require SEO
- Project to get proficient with React, understand the structure of UI components, and build from scratch

## Features

- Login & Registration
  - Login with email and password
  - Register with name, email, password, and password confirmation
  - Input validation
- Authentication
  - JWT access token stored locally, httpOnly cookie stores refresh token
  - Tokens are sent with user events in headers, redirect to login page on error
- Authorization
  - Feature restrictions based on user roles
    - Roles: Admin, Editor (site manager), Author, General User
  - This site is restricted to Admin, Editor, and Author roles only
- Admin Features
  - View user names, roles, emails, article topics, and registration dates
    - Search by name and email, filter by role, paging supported
    - Update roles directly from the list
  - View new member list and new articles on the dashboard
  - All other permissions
- Editor Features
  - Can view user information and author articles only
  - Can add topics, change names and order
  - Can select articles by authors for cover use
  - View new member list and new articles on the dashboard
  - Account settings
- Author Features
  - Can view, write, edit, and delete their own articles only
  - View reactions to their articles on the dashboard
  - Account settings
- Additional: Dark mode support

## Technologies & Libraries Used

- React + TypeScript w/ Vite
- Routing: React Router
- Styling: TailwindCSS
- Remote state management: Tanstack React Query
- UI state management:
  - Context API
  - Zustand
- Form management: React Hook Form
- Type checking: Zod (w/ hookform/resolvers)
- Icons: Iconify (icon set: Lucide)
- Date handling: Date-fns
- Server communication: Axios
- Encryption: Crypto-js (for AES256 encryption)
- UI styling reference: Shadcn/ui, Radix-based
- Development tools: VSCode, Docker, GitHub Copilot, Console Ninja, Redux DevTools, Eslint, Prettier

## Development Notes

- The original magazine site had a somewhat kitschy yet formal feel with serif fonts for headlines and a vivid color scheme based on ultramarine, but the CMS site was designed to be calm and neutral
  - Although the different logo fonts were bothersome, a compromise was made for consistency
- Considered using MUI or Ant Design UI but fell in love with the default styling of shadcn/ui and used it as the base for UI components
  - Learned about Radix, the headless UI shadcn/ui is based on, and plan to apply it to the original magazine site, which already has a design system
  - Headless UI libraries' documentation is flexible and offers a lot of learning for the component composite pattern
  - Developing dropdowns and tables to look good in various scenarios was tougher than expected

## References

- Udemy - The Ultimate React Course 2024: React, Redux & More
  (https://www.udemy.com/course/the-ultimate-react-course)
- Udemy - React Query: Server State Management with React (https://www.udemy.com/course/react-query-react)
- Udemy - Complete Guide to React with Redux, Next.js, TypeScript (https://www.udemy.com/course/best-react)
- Udemy - React & TypeScript - The Practical Guide
  (https://www.udemy.com/course/react-typescript-the-practical-guide)
- Useful Custom Hooks by Web Dev Simplified (https://github.com/WebDevSimplified/useful-custom-react-hooks/tree/main)



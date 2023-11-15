import Profile from './Profile';
import { ReactNode } from 'react';
import HeaderMenu from './HeaderMenu';

function Header(): ReactNode {
  return (
    <header className="flex items-center justify-end gap-4 border-b border-solid border-b-gray-100 bg-blue-200 px-12 py-5">
      <Profile />
      <HeaderMenu />
    </header>
  );
}

export default Header;

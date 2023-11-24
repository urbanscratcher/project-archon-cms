import Profile from '../features/Profile';
import { type PropsWithChildren } from 'react';
import HeaderMenu from './HeaderMenu';

function HeaderContainer({ children }: PropsWithChildren) {
  return (
    <header className="flex h-14 items-center justify-end gap-8 border-b-[1px] border-b-zinc-300 px-6 backdrop-blur-md">
      {children}
    </header>
  );
}

function Header() {
  return (
    <HeaderContainer>
      <Profile />
      <HeaderMenu />
    </HeaderContainer>
  );
}

export default Header;

import Profile from '../features/Profile';
import { type PropsWithChildren } from 'react';
import HeaderMenu from './HeaderMenu';

function HeaderContainer({ children }: PropsWithChildren) {
  return (
    <header
      className="flex
      h-16 items-center
      justify-end
      gap-8 overflow-hidden
      px-8      
      backdrop-blur-md
      "
    >
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

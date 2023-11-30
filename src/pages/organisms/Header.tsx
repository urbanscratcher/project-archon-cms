import { type PropsWithChildren } from 'react';
import GlobalNavMenu from '../../ui/HeaderMenu';
import Profile from '../../ui/Profile';

function Header() {
  console.log('Rendering...');

  return (
    <Header.Container>
      <Profile />
      <GlobalNavMenu />
    </Header.Container>
  );
}

export default Header;

Header.Container = function Container({ children }: PropsWithChildren) {
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
};

import { type PropsWithChildren } from 'react';
import PersonalMenu from './HeaderMenu';
import Profile from './Profile';

function NavBar() {
  return (
    <NavBar.Container>
      <Profile />
      <PersonalMenu />
    </NavBar.Container>
  );
}

export default NavBar;

NavBar.Container = function Container({ children }: PropsWithChildren) {
  return (
    <header
      className="
      sticky
      top-0
      z-10
      flex
      h-16
      w-full items-center
      justify-end
      gap-8 overflow-hidden
      bg-white/40
      px-8
      backdrop-blur-md
      "
    >
      {children}
    </header>
  );
};

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
      className={`
      flex
      h-16 w-[calc(100vw-260px)]
      items-center
      justify-end gap-8
      overflow-hidden
      px-8
      `}
    >
      {children}
    </header>
  );
};

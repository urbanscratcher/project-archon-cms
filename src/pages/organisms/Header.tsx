import { type PropsWithChildren } from 'react';
import PersonalMenu from '../../ui/HeaderMenu';
import Profile from '../../ui/Profile';

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

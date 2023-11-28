import { type PropsWithChildren } from 'react';
import Logo from '../../ui/Logo';
import MainNav from '../../ui/SidebarMenu';
import { NavLink } from 'react-router-dom';

function SidebarContainer({ children }: PropsWithChildren) {
  return (
    <nav
      className="
      row-span-full
      flex
      flex-col gap-12                  
      overflow-hidden
      px-6
      py-6
      "
    >
      {children}
    </nav>
  );
}

function Sidebar() {
  return (
    <SidebarContainer>
      <NavLink to="/dashboard">
        <Logo />
      </NavLink>
      <MainNav />
    </SidebarContainer>
  );
}

export default Sidebar;

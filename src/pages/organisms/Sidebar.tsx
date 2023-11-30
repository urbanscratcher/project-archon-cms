import { type PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../ui/Logo';
import NavMenu from '../../ui/NavMenu';

export default function Sidebar() {
  return (
    <Sidebar.Container>
      <NavLink to="/dashboard">
        <Logo />
      </NavLink>
      <NavMenu>
        <NavMenu.Item
          icon="icon-[lucide--user-2]"
          text="users"
        />
        <NavMenu.Item
          icon="icon-[lucide--tag]"
          text="topics"
        />
        <NavMenu.Item
          icon="icon-[lucide--pen-square]"
          text="insights"
        />
        <NavMenu.Item
          icon="icon-[lucide--user-circle-2]"
          text="Profile"
        />
      </NavMenu>
    </Sidebar.Container>
  );
}

Sidebar.Container = function Container({ children }: PropsWithChildren) {
  return (
    <nav
      className="
        row-span-full
        flex
        flex-col gap-12                  
        overflow-hidden
        px-6
        py-6"
    >
      {children}
    </nav>
  );
};

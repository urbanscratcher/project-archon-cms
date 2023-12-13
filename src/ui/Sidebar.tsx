import { type PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import NavMenu from './NavMenu';

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
        sticky top-12
        z-20
        row-span-full
        flex
        h-0
        w-[260px] flex-col gap-12                  
        px-8
        "
    >
      {children}
    </nav>
  );
};

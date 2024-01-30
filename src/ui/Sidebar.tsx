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
          icon="icon-[lucide--settings]"
          text="settings"
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
        flex min-w-[260px] flex-col                  
        gap-12
        px-8
        pt-5
        "
    >
      {children}
    </nav>
  );
};

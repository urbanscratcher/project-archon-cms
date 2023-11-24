import { type PropsWithChildren } from 'react';
import Logo from './Logo';
import MainNav from './SidebarMenu';

function SidebarContainer({ children }: PropsWithChildren) {
  return (
    <nav className="row-span-full flex flex-col gap-14 border-r border-solid border-r-zinc-100 px-10 py-12">
      {children}
    </nav>
  );
}

function Sidebar() {
  return (
    <SidebarContainer>
      <div className="flex scale-[80%]">
        <Logo />
      </div>
      <MainNav />
    </SidebarContainer>
  );
}

export default Sidebar;

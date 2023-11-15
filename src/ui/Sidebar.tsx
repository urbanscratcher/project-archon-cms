import { ReactNode } from 'react';
import Logo from './Logo';
import MainNav from './MainNav';

function Sidebar(): ReactNode {
  return (
    <div className="row-span-full flex flex-col gap-14 border-r border-solid border-r-gray-100 bg-red-200 px-10 py-12">
      <Logo />
      <MainNav />
    </div>
  );
}

export default Sidebar;

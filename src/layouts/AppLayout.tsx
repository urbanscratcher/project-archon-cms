import { type PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import Main from '../ui/Main';
import NavBar from '../ui/Navbar';
import Sidebar from '../ui/Sidebar';

export default function AppLayout() {
  return (
    <>
      <AppLayout.Portal />
      <AppLayout.Container>
        <Sidebar />
        <AppLayout.ContentArea>
          <NavBar />
          <Main>
            <Outlet />
          </Main>
        </AppLayout.ContentArea>
      </AppLayout.Container>
    </>
  );
}

AppLayout.ContentArea = function ContentArea({ children }: PropsWithChildren) {
  return <div className="flex flex-col">{children}</div>;
};

AppLayout.Container = function Container({ children }: PropsWithChildren) {
  return <div className={`flex text-zinc-800 dark:bg-zinc-900 dark:text-zinc-400`}>{children}</div>;
};

AppLayout.Portal = function Portal() {
  return (
    <div
      id="portal"
      className="relative"
    ></div>
  );
};

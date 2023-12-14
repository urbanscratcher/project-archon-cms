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
        <NavBar />
        <Main>
          <Outlet />
        </Main>
      </AppLayout.Container>
    </>
  );
}

AppLayout.Container = function Container({ children }: PropsWithChildren) {
  return (
    <div
      className="
  text-zinc-800
  "
    >
      {children}
    </div>
  );
};

AppLayout.Portal = function Portal() {
  return (
    <div
      id="portal"
      className="relative"
    ></div>
  );
};

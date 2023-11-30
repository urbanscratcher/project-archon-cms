import { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../pages/organisms/Header';
import Sidebar from '../pages/organisms/Sidebar';
import Main from '../ui/Main';

export default function AppLayout() {
  console.log('Rendering...');

  return (
    <>
      <AppLayout.Portal />
      <AppLayout.Container>
        <Sidebar />
        <Header />
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
  grid
  min-h-screen        
  grid-cols-[18rem_auto]
  grid-rows-[auto_1fr]
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

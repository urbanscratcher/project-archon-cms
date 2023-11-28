import { Outlet } from 'react-router-dom';
import Header from '../pages/organisms/Header';
import Main from '../ui/Main';
import Sidebar from '../pages/organisms/Sidebar';

function AppLayout() {
  console.log('Rendering...');

  return (
    <>
      <div
        id="portal"
        className="relative"
      ></div>
      <div
        className="
        grid
        min-h-screen        
        grid-cols-[18rem_auto]
        grid-rows-[auto_1fr]
        text-zinc-800
        "
      >
        <Sidebar />
        <Header />
        <Main>
          <Outlet />
        </Main>
      </div>
    </>
  );
}

export default AppLayout;

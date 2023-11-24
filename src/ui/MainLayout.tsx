import { Outlet } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Sidebar from './Sidebar';

function MainLayout() {
  console.log('Rendering...');

  return (
    <div className="grid h-screen grid-cols-[20rem_1fr] grid-rows-[auto_1fr] text-zinc-800">
      <Sidebar />
      <Header />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
}

export default MainLayout;

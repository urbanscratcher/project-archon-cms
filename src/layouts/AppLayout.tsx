import { Outlet } from 'react-router-dom';
import Header from '../ui/Header';
import Main from '../ui/Main';
import Sidebar from '../ui/Sidebar';

function AppLayout() {
  console.log('Rendering...');

  return (
    <div
      className="
        grid
        min-h-screen        
        grid-cols-[18rem_1fr]
        grid-rows-[auto_1fr]
        overflow-hidden
        text-zinc-800
        "
    >
      <Sidebar />
      <Header />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
}

export default AppLayout;

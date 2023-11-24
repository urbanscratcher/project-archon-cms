import { Outlet } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Sidebar from './Sidebar';

function Layout() {
  console.log('Rendering...');

  return (
    <div
      className="
        grid
        min-h-screen        
        grid-cols-[18rem_1fr]
        grid-rows-[auto_1fr]
        text-zinc-800"
    >
      <Sidebar />
      <Header />
      <Main>
        <Outlet />
      </Main>
    </div>
  );
}

export default Layout;

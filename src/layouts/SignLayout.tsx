import { Outlet } from 'react-router-dom';
import Logo from '../ui/Logo';

export function SignLayout() {
  return (
    <div
      className="
        grid
        min-h-screen
        grid-cols-[30rem]
        content-center
        justify-center
        gap-8 text-zinc-800"
    >
      <div className="scale-150 justify-self-center">
        <Logo />
      </div>
      <Outlet />
    </div>
  );
}

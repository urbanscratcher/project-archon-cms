import { Outlet } from 'react-router-dom';
import Logo from '../ui/Logo';
import { useState } from 'react';

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
type AvatarProps = {
  url?: string;
};

export function Avatar({ url }: AvatarProps) {
  const [loaded, setLoaded] = useState(false);
  const [failedLoad, setFailedLoad] = useState(false);

  return (
    <div className="h-8 w-8">
      {!url || failedLoad ? (
        <span className="icon-[lucide--user-circle] h-full w-full text-zinc-300"></span>
      ) : (
        <img
          className={loaded || !failedLoad ? '' : 'invisible'}
          src={url}
          alt={'user avatar'}
          onLoad={() => setLoaded(true)}
          onError={() => setFailedLoad(true)}
        />
      )}
    </div>
  );
}

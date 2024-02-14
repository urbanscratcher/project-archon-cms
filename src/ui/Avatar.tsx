import { useState } from 'react';

type AvatarProps = {
  url?: string;
  isLarge?: boolean;
};

export function Avatar({ url, isLarge = false }: AvatarProps) {
  const [loaded, setLoaded] = useState(false);
  const [failedLoad, setFailedLoad] = useState(false);

  return (
    <div className={`${isLarge ? 'h-28 w-28' : 'h-8 w-8'}`}>
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

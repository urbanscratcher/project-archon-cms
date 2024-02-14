import { useEffect, useState } from 'react';
import Spinner from './Spinner';

type AvatarProps = {
  src?: string;
  isLarge?: boolean;
};

export function Avatar({ src, isLarge = false }: AvatarProps) {
  const [loading, setLoading] = useState(true);
  const [failedLoad, setFailedLoad] = useState(false);

  return (
    <div className={`${isLarge ? 'h-28 w-28' : 'h-8 w-8'} flex items-center justify-center`}>
      <img
        hidden={loading || failedLoad}
        src={src}
        alt={'user avatar'}
        onLoad={() => setLoading(false)}
        onError={() => setFailedLoad(true)}
      />
      {(failedLoad || src === '' || src === undefined || src === null) && (
        <span className="icon-[lucide--user-circle] h-full w-full text-zinc-300"></span>
      )}
      {loading && !failedLoad && src && <Spinner withText={false} />}
    </div>
  );
}

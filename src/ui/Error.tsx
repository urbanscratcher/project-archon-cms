import { type PropsWithChildren } from 'react';

function Error({ children }: PropsWithChildren) {
  return <span className="text-2xl text-red-700">{children}</span>;
}

export default Error;

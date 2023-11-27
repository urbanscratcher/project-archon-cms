import { type PropsWithChildren } from 'react';

function Error({ children }: PropsWithChildren) {
  return <span className="text-xl text-red-600">{children}</span>;
}

export default Error;

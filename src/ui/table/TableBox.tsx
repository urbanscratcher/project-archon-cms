import { type PropsWithChildren } from 'react';

export function TableBox({ children }: PropsWithChildren) {
  return <div className="overflow-x-auto rounded-md border border-zinc-300 ">{children}</div>;
}

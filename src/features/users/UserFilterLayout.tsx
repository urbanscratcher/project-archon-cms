import { PropsWithChildren } from 'react';

export function UserFilter({ children }: PropsWithChildren) {
  return <div className="flex flex-wrap items-center justify-between gap-1">{children}</div>;
}

import { PropsWithChildren } from 'react';

export function MainBody({ children }: PropsWithChildren) {
  return <div className="relative flex flex-col gap-4">{children}</div>;
}

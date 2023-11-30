import { PropsWithChildren } from 'react';

export function MainLayout({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-8">{children}</div>;
}

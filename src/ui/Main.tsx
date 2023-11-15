import { ReactNode } from 'react';
import { WrapperProps } from '../utils/interfaces';

function Main({ children }: WrapperProps): ReactNode {
  return (
    <main className="overflow-scroll bg-ghost-50 px-20 pb-24 pt-16">
      <div className="mx-auto my-0 flex max-w-[120rem] flex-col gap-12">{children}</div>
    </main>
  );
}

export default Main;

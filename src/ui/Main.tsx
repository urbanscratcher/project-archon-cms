import { ReactNode } from 'react';

type MainProps = {
  children: ReactNode;
};

function Main({ children }: MainProps): ReactNode {
  return (
    <main className="overflow-scroll bg-gray-50 px-20 pb-24 pt-16">
      <div className="mx-auto my-0 flex max-w-[120rem] flex-col gap-12">{children}</div>
    </main>
  );
}

export default Main;

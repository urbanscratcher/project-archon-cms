import { type PropsWithChildren } from 'react';

function Main({ children }: PropsWithChildren) {
  return (
    <main
      className="
        h-[calc(100vh-64px)]
        overflow-y-scroll
         pb-10
        pt-6
        xl:px-16
        2xl:px-40
      "
    >
      {children}
    </main>
  );
}

export default Main;

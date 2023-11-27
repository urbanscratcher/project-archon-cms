import { type PropsWithChildren } from 'react';

function Main({ children }: PropsWithChildren) {
  return (
    <main
      className="
        max-w-[127rem]
        overflow-hidden
         pb-24 pt-6
         xl:px-16
        2xl:px-40
      "
    >
      {children}
    </main>
  );
}

export default Main;

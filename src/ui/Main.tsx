import { type PropsWithChildren } from 'react';

function Main({ children }: PropsWithChildren) {
  return (
    <main
      className="
        h-full
        max-w-[127rem]
        overflow-hidden
         pb-10 pt-6
         xl:px-16
        2xl:px-40
      "
    >
      {children}
    </main>
  );
}

export default Main;

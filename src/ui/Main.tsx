import { type PropsWithChildren } from 'react';

function Main({ children }: PropsWithChildren) {
  return (
    <main
      className="
        max-w-[127rem]
        overflow-hidden
        px-20 pb-24 pt-6
      "
    >
      {children}
    </main>
  );
}

export default Main;

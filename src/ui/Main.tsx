import { type PropsWithChildren } from 'react';

function Main({ children }: PropsWithChildren) {
  return (
    <main
      className="      
      sticky
        left-[260px]
        right-0
        w-[calc(100vw-260px)]
         overflow-hidden pb-10
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

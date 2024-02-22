import { type PropsWithChildren } from 'react';

function MainHead({ children }: PropsWithChildren) {
  return <div className="mb-4 flex flex-col">{children}</div>;
}

MainHead.Title = function Title({ children }: PropsWithChildren) {
  return <h2>{children}</h2>;
};

MainHead.Description = function Description({ children }: PropsWithChildren) {
  return <div className={`inline-flex items-center gap-1 text-zinc-500 dark:text-zinc-400`}>{children}</div>;
};

export default MainHead;

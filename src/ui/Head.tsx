import { type PropsWithChildren } from 'react';

function Head({ children }: PropsWithChildren) {
  return <div className="mb-4 flex flex-col">{children}</div>;
}

Head.Title = function Title({ children }: PropsWithChildren) {
  return <h2>{children}</h2>;
};

Head.Description = function Description({ children }: PropsWithChildren) {
  return <div className="inline-flex items-center gap-1 text-zinc-500">{children}</div>;
};

export default Head;

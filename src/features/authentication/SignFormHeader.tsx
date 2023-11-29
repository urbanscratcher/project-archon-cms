import { type PropsWithChildren } from 'react';

function SignForm({ children }: PropsWithChildren) {
  return <div className="mb-4 flex flex-col">{children}</div>;
}

SignForm.Title = function Title({ children }: PropsWithChildren) {
  return <h2>{children}</h2>;
};

SignForm.Description = function Description({ children }: PropsWithChildren) {
  return <div className="inline-flex items-center gap-1 text-zinc-500">{children}</div>;
};

export default SignForm;

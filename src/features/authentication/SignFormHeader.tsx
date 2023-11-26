import { ReactNode } from 'react';

type SignFormHeader = {
  title: string;
  description: string | ReactNode;
};

function SignFormHeader({ title, description }: SignFormHeader) {
  return (
    <div className="mb-4 flex flex-col">
      <h2 className="text-navy-700">{title}</h2>
      <div className="inline-flex items-center gap-1 text-zinc-500">{description}</div>
    </div>
  );
}

export default SignFormHeader;

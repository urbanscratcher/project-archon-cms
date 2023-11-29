import { PropsWithChildren } from 'react';

function InputMsg({ children }: PropsWithChildren) {
  if (!children) return;

  return (
    <div
      className={`pointer-events-none absolute right-1 top-1/2 translate-y-[-50%] bg-white px-3 text-sm leading-6 text-zinc-400 transition-opacity ${
        children ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </div>
  );
}

export default InputMsg;

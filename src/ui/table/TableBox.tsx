import { type PropsWithChildren } from 'react';

function TableBox({ children }: PropsWithChildren) {
  return (
    <div className="min-w-[64px] max-w-full overflow-scroll rounded-md border border-zinc-300 xl:overflow-visible">
      {children}
    </div>
  );
}

export default TableBox;

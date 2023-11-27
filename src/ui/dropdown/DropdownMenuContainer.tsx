import { type ReactNode } from 'react';

type DropdownMenuContainerProps = {
  children: ReactNode;
};

function DropdownMenuContainer({ children }: DropdownMenuContainerProps) {
  return <div className="absolute left-0 top-full z-10 min-w-max translate-y-1">{children}</div>;
}

export default DropdownMenuContainer;

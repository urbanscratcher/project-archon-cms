import { type ReactNode } from 'react';

type DropdownMenuBoxProps = {
  children: ReactNode;
};
function DropdownMenuBox({ children }: DropdownMenuBoxProps) {
  return (
    <ul
      role="menu"
      className="min-w-[8rem] overflow-hidden rounded-sm border border-zinc-300 bg-white p-1 text-sm shadow-md"
    >
      {children}
    </ul>
  );
}
export default DropdownMenuBox;

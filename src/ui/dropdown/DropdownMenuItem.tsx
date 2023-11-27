import { ComponentPropsWithoutRef } from 'react';

export function DropdownMenuItem({ children, onMouseDown, ...props }: ComponentPropsWithoutRef<'li'>) {
  return (
    <li
      {...props}
      onMouseDown={onMouseDown}
      role="menuitem"
      className="relative cursor-default select-none items-center py-1.5 pl-8 pr-2 capitalize transition-colors hover:bg-zinc-100 focus:bg-zinc-100"
    >
      {children}
    </li>
  );
}

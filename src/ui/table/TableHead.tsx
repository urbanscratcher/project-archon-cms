import { type PropsWithChildren } from 'react';

type TableHeadCellProps = {
  head: string;
};

export function TableHeadCell({ head }: TableHeadCellProps) {
  return (
    <th
      className="
        pl-2
        text-left
        font-medium
        capitalize
        text-zinc-600
        [&:has([role=checkbox])]:pr-0
        [&>[role=checkbox]]:translate-y-[2px]
      "
      colSpan={1}
      scope="col"
    >
      {head}
    </th>
  );
}

export function TableHead({ children }: PropsWithChildren) {
  return (
    <thead className="border-b border-b-zinc-300">
      <tr className="h-10 bg-zinc-50 transition-colors hover:bg-zinc-100">{children}</tr>
    </thead>
  );
}

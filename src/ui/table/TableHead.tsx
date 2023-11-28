import { ColumnDef } from '../../utils/types';

type TableHeadCellProps = {
  head: string;
  width: string;
};

export function TableHeadCell({ head, width }: TableHeadCellProps) {
  return (
    <th
      className={`
        pl-2
        text-left
        font-medium
        capitalize
        text-zinc-500
        [&:has([role=checkbox])]:pr-0
        [&>[role=checkbox]]:translate-y-[2px]
        ${width}
      `}
      colSpan={1}
      scope="col"
    >
      {head}
    </th>
  );
}

type TableHeadProps<T> = {
  columnDefs: ColumnDef<T>[];
};

export function TableHead<K>({ columnDefs }: TableHeadProps<K>) {
  return (
    <thead className="border-b border-b-zinc-300">
      <tr className="h-10 bg-zinc-50 transition-colors hover:bg-zinc-100">
        {columnDefs.map((def) => (
          <TableHeadCell
            key={`${def.type}_${def.head}`}
            head={def.head}
            width={def.width}
          />
        ))}
      </tr>
    </thead>
  );
}

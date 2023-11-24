import { type PropsWithChildren, type ReactNode } from 'react';
import { ColumnDef, type Dto, type ListData } from '../../utils/types';

type TableRowCellProps = {
  children: ReactNode;
  index?: boolean;
};

export function TableRowCell({ children, index = false }: TableRowCellProps) {
  const style = `p-2
    [&:has([role=checkbox])]:pr-0
    [&>[role=checkbox]]:translate-y-[2px]
  `;

  if (index) {
    return (
      <th
        scope="row"
        className={`${style} font-medium`}
      >
        {children}
      </th>
    );
  }
  return <td className={`${style}`}>{children}</td>;
}

export function TableRow({ children }: PropsWithChildren) {
  return (
    <tr
      className="
      border-b
      border-b-zinc-300
    transition-colors hover:bg-zinc-50
    data-[state=selected]:bg-zinc-100
  "
    >
      {children}
    </tr>
  );
}

type TableBodyProps<T> = {
  listData: ListData<T & Dto>;
  columnDefs: ColumnDef<T>[];
};

function TableBody<T>({ listData, columnDefs }: TableBodyProps<T>) {
  return (
    <tbody className="[&_tr:last-child]:border-0">
      {listData.data.map((row, listIdx) => (
        <TableRow key={row.idx}>
          {columnDefs.map((def) => (
            <TableRowCell
              index={def.type === 'index'}
              key={`${def.type}_${def.head}`}
            >
              {def.type === 'data' ? def.displayFn(row) : <p className="text-sm text-zinc-500">{listIdx + 1}</p>}
            </TableRowCell>
          ))}
        </TableRow>
      ))}
    </tbody>
  );
}

export default TableBody;

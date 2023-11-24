import { type ReactNode, type PropsWithChildren } from 'react';

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

function TableBody({ children }: PropsWithChildren) {
  return <tbody className="[&_tr:last-child]:border-0">{children}</tbody>;
}

export default TableBody;

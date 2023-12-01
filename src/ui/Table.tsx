import { ComponentPropsWithoutRef, type PropsWithChildren } from 'react';

function Table({ children }: PropsWithChildren) {
  return (
    <div className="min-w-[64px] max-w-full overflow-scroll rounded-md border border-zinc-300 xl:overflow-visible">
      <table className="w-full caption-bottom">{children}</table>
    </div>
  );
}

Table.HeadCell = function HeadCell({ children }: PropsWithChildren) {
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
      `}
      colSpan={1}
      scope="col"
    >
      {children}
    </th>
  );
};

Table.Head = function Head({ children }: PropsWithChildren) {
  return <thead className="border-b border-b-zinc-300">{children}</thead>;
};

Table.HeadRow = function HeadRow({ children }: PropsWithChildren) {
  return <tr className="h-10 bg-zinc-50 transition-colors hover:bg-zinc-100">{children}</tr>;
};

Table.Row = function Row({ children }: PropsWithChildren) {
  return (
    <tr
      className="
      border-b
      border-b-zinc-300
      transition-colors hover:bg-zinc-50
    data-[state=selected]:bg-zinc-100"
    >
      {children}
    </tr>
  );
};

Table.Cell = function Cell({ children, ...otherProps }: ComponentPropsWithoutRef<'th'>) {
  return (
    <td
      className={'relative p-2 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'}
      {...otherProps}
    >
      {children}
    </td>
  );
};

Table.CellFull = function CellFull({ children }: PropsWithChildren) {
  return (
    <Table.Cell
      colSpan={50}
      className="py-3 text-center"
    >
      {children}
    </Table.Cell>
  );
};

Table.Body = function Body({ children }: PropsWithChildren) {
  return <tbody className="[&_tr:last-child]:border-0">{children}</tbody>;
};

export default Table;
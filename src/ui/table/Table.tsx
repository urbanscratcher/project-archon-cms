import { ReactNode, type PropsWithChildren, ComponentPropsWithoutRef, MouseEvent } from 'react';

function Table({ children }: PropsWithChildren) {
  return (
    <div className="max-w-full overflow-scroll rounded-md outline outline-1 outline-zinc-300 dark:outline-zinc-700 xl:overflow-visible">
      <table className="w-full table-fixed  caption-bottom">{children}</table>
    </div>
  );
}

Table.HeadCell = function HeadCell({ children, className }: PropsWithChildren & { className?: string }) {
  return (
    <th
      className={`text-left
        font-medium
        capitalize
        text-zinc-500
        dark:text-zinc-400 
      ${className || ''}`}
      colSpan={1}
      scope="col"
    >
      {children}
    </th>
  );
};

Table.Head = function Head({ children }: PropsWithChildren) {
  return <thead className="border-b border-b-zinc-300 dark:border-b-zinc-700">{children}</thead>;
};

Table.HeadRow = function HeadRow({ children }: PropsWithChildren) {
  return (
    <tr className="h-10 bg-zinc-50 transition-colors hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800">
      {children}
    </tr>
  );
};

Table.Row = function Row({ children, className, ...otherProps }: PropsWithChildren & ComponentPropsWithoutRef<'tr'>) {
  return (
    <tr
      className={`border-b border-b-zinc-300 transition-colors
      hover:bg-zinc-50 dark:border-b-zinc-700
    dark:hover:bg-zinc-800 ${className || ''}`}
      {...otherProps}
    >
      {children}
    </tr>
  );
};

type TableCellProps = {
  children: ReactNode;
  colSpan?: number;
  key?: string;
  className?: string;
  onClick?: (e: MouseEvent) => void;
};

Table.Cell = function Cell({ children, colSpan, className, onClick }: TableCellProps) {
  return (
    <td
      className={'relative p-2 ' + className}
      colSpan={colSpan}
      onClick={onClick}
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

Table.BodyFull = function BodyFull({ children }: PropsWithChildren) {
  return (
    <Table.Body>
      <Table.Row>
        <Table.CellFull>{children}</Table.CellFull>
      </Table.Row>
    </Table.Body>
  );
};

export default Table;

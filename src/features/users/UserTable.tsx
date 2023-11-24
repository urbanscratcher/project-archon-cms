import Table from '../../ui/table/Table';
import TableBody, { TableRow, TableRowCell } from '../../ui/table/TableBody';
import { TableHead, TableHeadCell } from '../../ui/table/TableHead';
import { type ListData, type ColumnDef } from '../../utils/types';
import { type User } from './Users';

export type UserTableProps<T> = {
  columnDefs: ColumnDef<User>[];
  list: ListData<T>;
};

function UserTable({ columnDefs, list }: UserTableProps<User>) {
  return (
    <div className="overflow-auto rounded-md border border-zinc-300">
      <Table>
        <TableHead>
          {columnDefs.map((def) => (
            <TableHeadCell
              key={def.head}
              head={def.head}
            />
          ))}
        </TableHead>
        <TableBody>
          {list.data.map((row, listIdx) => (
            <TableRow key={row.idx}>
              {columnDefs.map((def, defIdx) => (
                <TableRowCell
                  index={defIdx === 0}
                  key={def.head}
                >
                  {defIdx > 0 ? def.displayFn(row) : <p className="text-sm text-zinc-500">{listIdx + 1}</p>}
                </TableRowCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default UserTable;

import { type PropsWithChildren } from 'react';
import { type User } from '../../pages/Users';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/table/Table';
import TableBody from '../../ui/table/TableBody';
import { TableHead } from '../../ui/table/TableHead';
import { type Dto, type ColumnDef, type ListData } from '../../utils/types';
import useUsers from './useUsers';
import userColumnDefs from './userColumnDefs';

export type UserTableProps<T> = {
  columnDefs: ColumnDef<User>[];
  list: ListData<T & Dto>;
};

export function TableContainer({ children }: PropsWithChildren) {
  return <div className="overflow-auto rounded-md border border-zinc-300">{children}</div>;
}

function UserTable() {
  const { users, isLoading } = useUsers();
  if (isLoading) return <Spinner />;

  // data mapping
  const newData = users.data.map((u: any): User => {
    return {
      idx: u.idx,
      firstName: u.first_name,
      lastName: u.last_name,
      email: u.email,
      role: u.role,
      avatar: u.avatar,
      topics: u.topics,
      createdAt: new Date(u.created_at),
    };
  });
  const userList: ListData<User> = { ...users, data: newData };

  return (
    <TableContainer>
      <Table>
        <TableHead columnDefs={userColumnDefs} />
        <TableBody
          columnDefs={userColumnDefs}
          listData={userList}
        />
      </Table>
    </TableContainer>
  );
}

export default UserTable;

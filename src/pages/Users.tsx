import { PropsWithChildren, useState } from 'react';
import UsersFilterInput from '../features/users/UserFilterInput';
import { UsersFilter } from '../features/users/UserFilterLayout';
import UserFilterRole, { SelectOptions } from '../features/users/UserFilterRole';
import UserTableBody from '../features/users/UserTable';
import userColumnDefs from '../features/users/userColumnDefs';
import { useUserFilterStore } from '../features/users/usersStore';
import Head from '../ui/Head';
import Pagination from '../ui/Pagination';
import Table from '../ui/table/Table';
import TableBox from '../ui/table/TableBox';
import { TableHead } from '../ui/table/TableHead';

export type Topic = {
  idx: number;
  name: string;
  seq: number;
};

export type User = {
  idx: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'editor' | 'writer' | 'user';
  avatar?: string;
  topics?: Topic[];
  createdAt: Date;
};

export function MainLayout({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-8">{children}</div>;
}

function UsersLayout({ children }: PropsWithChildren) {
  return (
    <div
      id="users-portal"
      className="relative flex flex-col gap-4"
    >
      {children}
    </div>
  );
}

function Users() {
  const [roleFilter, setRoleFilter] = useState<SelectOptions[]>([]);
  const { searchFilter } = useUserFilterStore();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState<number>(0);

  const onSetTotal = (total: number) => {
    setTotal(total);
  };

  const onSetRoleFilter = (value: SelectOptions[]) => {
    setRoleFilter(value);
  };

  const onSetLimit = (value: number) => {
    setLimit(value);
  };

  const onSetOffset = (value: number) => {
    setOffset(value);
  };

  return (
    <MainLayout>
      <Head>
        <Head.Title>Users</Head.Title>
        <Head.Description>A list of users to be managed (only for admins)</Head.Description>
      </Head>
      <UsersLayout>
        <UsersFilter>
          <UsersFilterInput />
          <UserFilterRole onSetFilter={onSetRoleFilter} />
        </UsersFilter>
        <TableBox>
          <Table>
            <TableHead columnDefs={userColumnDefs} />
            <UserTableBody
              inputFilter={searchFilter ? searchFilter : ''}
              roleFilter={roleFilter}
              offset={offset}
              limit={limit}
              onSetTotal={onSetTotal}
            />
          </Table>
        </TableBox>
        <Pagination
          offset={offset}
          limit={limit}
          total={total}
          onSetLimit={onSetLimit}
          onSetOffset={onSetOffset}
        />
      </UsersLayout>
    </MainLayout>
  );
}

export default Users;

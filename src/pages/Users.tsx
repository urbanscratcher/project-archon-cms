import { PropsWithChildren, useState } from 'react';
import UserInputFilter from '../features/users/UserInputFilter';
import UserRoleFilter, { SelectOptions } from '../features/users/UserRoleFilter';
import UserTableBody from '../features/users/UserTable';
import userColumnDefs from '../features/users/userColumnDefs';
import MainHeader from '../ui/MainHeader';
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

function UserContentLayout({ children }: PropsWithChildren) {
  return (
    <div
      id="users-portal"
      className="relative flex flex-col gap-4"
    >
      {children}
    </div>
  );
}

function UserFilterLayout({ children }: PropsWithChildren) {
  return <div className="flex flex-wrap items-center justify-between gap-1">{children}</div>;
}

function Users() {
  const [inputFilter, setInputFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState<SelectOptions[]>([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);

  const onSetTotal = (total: number) => {
    setTotal(total);
  };

  const onSetInputFilter = (value: string) => {
    setInputFilter(value);
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
      <MainHeader
        title={'users'}
        desc={'A list of users to be managed (only for admin)'}
      />
      <UserContentLayout>
        <UserFilterLayout>
          <UserInputFilter onSetFilter={onSetInputFilter} />
          <UserRoleFilter onSetFilter={onSetRoleFilter} />
        </UserFilterLayout>
        <TableBox>
          <Table>
            <TableHead columnDefs={userColumnDefs} />
            <UserTableBody
              inputFilter={inputFilter}
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
      </UserContentLayout>
    </MainLayout>
  );
}

export default Users;

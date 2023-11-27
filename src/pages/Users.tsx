import { PropsWithChildren, useState } from 'react';
import UserInputFilter from '../features/users/UserInputFilter';
import UserRoleFilter, { SelectOptions } from '../features/users/UserRoleFilter';
import UserTableBody from '../features/users/UserTable';
import userColumnDefs from '../features/users/userColumnDefs';
import MainHeader from '../ui/MainHeader';
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
      className="relative flex flex-col gap-1"
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

  const onSetInputFilter = (value: string) => {
    setInputFilter(value);
  };

  const onSetRoleFilter = (value: SelectOptions[]) => {
    setRoleFilter(value);
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
          <UserRoleFilter onSetFilterValue={onSetRoleFilter} />
        </UserFilterLayout>
        <TableBox>
          <Table>
            <TableHead columnDefs={userColumnDefs} />
            <UserTableBody
              inputFilter={inputFilter}
              roleFilter={roleFilter}
            />
          </Table>
        </TableBox>
      </UserContentLayout>
    </MainLayout>
  );
}

export default Users;
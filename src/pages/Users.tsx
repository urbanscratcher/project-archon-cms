import { PropsWithChildren, useState } from 'react';
import UserInputFilter from '../features/users/UserInputFilter';
import UserRoleFilter from '../features/users/UserRoleFilter';
import UserTableBody from '../features/users/UserTable';
import userColumnDefs from '../features/users/userColumnDefs';
import MainHeader from '../ui/MainHeader';
import Table from '../ui/table/Table';
import { TableBox } from '../ui/table/TableBox';
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
  return <div className="flex flex-col gap-2">{children}</div>;
}

function UserFilterLayout({ children }: PropsWithChildren) {
  return <div className="flex items-center justify-between">{children}</div>;
}

function Users() {
  const [inputFilter, setInputFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const onSetInputFilter = (value: string) => {
    setInputFilter(value);
  };

  const onSetRoleFilter = (value: string) => {
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
          <UserInputFilter onSetFilterValue={onSetInputFilter} />
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

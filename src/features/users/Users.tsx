import MainHeader from '../../ui/MainHeader';
import { type ListData } from '../../utils/types';
import UserTable from './UserTable';
import userColumnDefs from './userColumnDefs';

export const enum ROLE {
  ADMIN = 'admin',
  EDITOR = 'editor',
  WRITER = 'writer',
  USER = 'user',
}

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
  role: ROLE;
  avatar?: string;
  topics?: Topic[];
  createdAt: Date;
};

const dummyData: ListData<User> = {
  total: 12,
  offset: 0,
  limit: 5,
  data: [
    {
      idx: 1,
      email: 'test@gmail.com',
      firstName: 'first',
      lastName: 'last',
      role: ROLE.ADMIN,
      createdAt: new Date('2023-11-14T04:49:06.000Z'),
    },
    {
      idx: 2,
      email: 'user@gmail.com',
      firstName: 'upfirst',
      lastName: 'uplast',
      role: ROLE.USER,
      avatar:
        'https://axfgfcum1yp2.objectstorage.ap-chuncheon-1.oci.customer-oci.com/n/axfgfcum1yp2/b/bucket-archon/o/avatar%2Ftest-avatar.jpg',
      createdAt: new Date('2023-11-14T04:55:49.000Z'),
      topics: [
        {
          idx: 4,
          name: 'interior2',
          seq: 3,
        },
      ],
    },
    {
      idx: 3,
      email: 'editor@gmail.com',
      firstName: 'first',
      lastName: 'last',
      role: ROLE.EDITOR,
      createdAt: new Date('2023-11-14T04:59:35.000Z'),
    },
    {
      idx: 4,
      email: 'editor2@gmail.com',
      firstName: 'first',
      lastName: 'last',
      role: ROLE.USER,
      createdAt: new Date('2023-11-14T06:22:34.000Z'),
    },
    {
      idx: 5,
      email: 'editor2@gmail.comsdfsdfsdfsd',
      firstName: 'first',
      lastName: 'last',
      role: ROLE.USER,
      createdAt: new Date('2023-11-14T06:28:13.000Z'),
    },
  ],
};

function Users() {
  return (
    <div className="flex flex-col gap-8">
      <MainHeader
        title={'users'}
        desc={'A list of users to be managed (only for admin)'}
      />
      <UserTable
        columnDefs={userColumnDefs}
        list={dummyData}
      />
    </div>
  );
}

export default Users;

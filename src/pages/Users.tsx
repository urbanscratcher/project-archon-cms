import UserTable from '../features/users/UserTable';
import MainHeader from '../ui/MainHeader';

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

function Users() {
  return (
    <div className="flex flex-col gap-8">
      <MainHeader
        title={'users'}
        desc={'A list of users to be managed (only for admin)'}
      />
      <UserTable />
    </div>
  );
}

export default Users;

import { format } from 'date-fns';
import { User } from '../../pages/Users';
import { type ColumnDef } from '../../utils/types';
import UserNameCell from './UserNameCell';
import UserRoleCell from './UserRoleCell';
import UserTopicsCell from './UserTopicsCell';

const userColumnDefs: ColumnDef<User>[] = [
  {
    type: 'index',
    head: 'no',
    width: 'w-[5%] text-center',
    displayFn: (u) => u.idx,
  },
  {
    type: 'data',
    head: 'name',
    width: 'w-[20%]',
    displayFn: (u) => (
      <UserNameCell
        avatar={u?.avatar}
        firstName={u.firstName}
        lastName={u.lastName}
      />
    ),
  },
  {
    type: 'data',
    head: 'role',
    width: 'w-[12%]',
    displayFn: (u) => (
      <UserRoleCell
        idx={u.idx}
        userRole={u.role}
        options={['user', 'admin', 'editor', 'writer']}
      />
    ),
  },
  { type: 'data', head: 'email', width: 'w-[25%]', displayFn: (u) => u.email },
  { type: 'data', head: 'topics', width: 'w-[25%]', displayFn: (u) => <UserTopicsCell topics={u?.topics} /> },
  {
    type: 'data',
    head: 'joined at',
    width: 'w-[13%]',
    displayFn: (u) => <p className="whitespace-nowrap">{format(u.createdAt, 'yyyy-MM-dd')}</p>,
  },
];

export default userColumnDefs;

import { format } from 'date-fns';
import { User } from '../../pages/Topic';
import { type ColumnDef } from '../../utils/types';
import UserNameCell from './UserNameCell';
import UserRoleCell from './UserRoleCell';
import UserTopicsCell from './UserTopicsCell';

const userColumnDefs: ColumnDef<User>[] = [
  {
    type: 'index',
    head: 'no',
    displayFn: (u) => <p className="text-center text-sm text-zinc-500">{u.idx}</p>,
  },
  {
    type: 'data',
    head: 'name',
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
    displayFn: (u) => (
      <UserRoleCell
        idx={u.idx}
        userRole={u.role}
        options={['user', 'admin', 'editor', 'writer']}
      />
    ),
  },
  { type: 'data', head: 'email', displayFn: (u) => u.email },
  { type: 'data', head: 'topics', displayFn: (u) => <UserTopicsCell topics={u?.topics} /> },
  {
    type: 'data',
    head: 'joined at',
    displayFn: (u) => <p className="whitespace-nowrap">{format(u.createdAt, 'yyyy-MM-dd')}</p>,
  },
];

export default userColumnDefs;

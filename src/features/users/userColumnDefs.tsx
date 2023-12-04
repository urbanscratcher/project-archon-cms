import { format } from 'date-fns';
import { type ColumnDef } from '../../utils/types';
import UserCellName from './UserCellName';
import UserCellRole from './UserCellRole';
import UserCellTopics from './UserCellTopics';
import { User } from '../../models/Users';

const userColumnDefs: ColumnDef<User>[] = [
  {
    type: 'index',
    head: 'idx',
    displayFn: (u) => <p className="text-center text-sm text-zinc-500">{u.idx}</p>,
    sortable: true,
    sortKey: 'idx',
    style: 'w-[7%]',
  },
  {
    type: 'data',
    head: 'name',
    sortable: true,
    sortKey: 'first_name',
    style: 'w-[22%]',
    displayFn: (u) => (
      <UserCellName
        avatar={u?.avatar}
        firstName={u.firstName}
        lastName={u.lastName}
      />
    ),
  },
  {
    type: 'data',
    head: 'role',
    style: 'w-[12%]',
    displayFn: (u) => (
      <UserCellRole
        idx={u.idx}
        userRole={u.role}
        options={['user', 'admin', 'editor', 'writer']}
      />
    ),
  },
  { type: 'data', head: 'email', sortable: true, sortKey: 'email', style: 'w-[25%]', displayFn: (u) => u.email },
  { type: 'data', head: 'topics', style: 'w-auto', displayFn: (u) => <UserCellTopics topics={u?.topics} /> },
  {
    type: 'data',
    head: 'joined at',
    sortable: true,
    sortKey: 'created_at',
    style: 'w-[16%]',
    displayFn: (u) => <p className="whitespace-nowrap">{format(u.createdAt, 'yyyy-MM-dd')}</p>,
  },
];

export default userColumnDefs;

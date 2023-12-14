import { format } from 'date-fns';
import { type ColumnDef } from '../../utils/types';
import UserCellName from '../../ui/UserBadge';
import UserCellRole from './UserCellRole';
import UserCellTopics from './UserCellTopics';
import { User } from '../../models/Users';

const userColumnDefs: ColumnDef<User>[] = [
  {
    type: 'data',
    head: 'name',
    sortKey: 'first_name',
    style: 'w-[15rem] truncate',
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
    style: 'w-[10rem]',
    displayFn: (u) => (
      <UserCellRole
        idx={u.idx}
        userRole={u.role}
        options={['user', 'admin', 'editor', 'writer']}
      />
    ),
  },
  { type: 'data', head: 'email', sortKey: 'email', style: 'w-[17rem]', displayFn: (u) => u.email },
  {
    type: 'data',
    head: 'topics',
    style: 'w-auto w-[14rem] truncate',
    displayFn: (u) => <UserCellTopics topics={u?.topics} />,
  },
  {
    type: 'data',
    head: 'joined at',
    sortKey: 'idx',
    style: 'w-auto',
    displayFn: (u) => <p className="whitespace-nowrap">{format(u.createdAt, 'yyyy-MM-dd')}</p>,
  },
];

export default userColumnDefs;

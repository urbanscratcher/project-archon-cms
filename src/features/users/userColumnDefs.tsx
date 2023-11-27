import { format } from 'date-fns';
import { type MouseEvent } from 'react';
import { User } from '../../pages/Users';
import Button from '../../ui/button/Button';
import { type ColumnDef } from '../../utils/types';
import UserNameCell from './UserNameCell';
import UserRoleCell from './UserRoleCell';
import UserTopicsCell from './UserTopiccCell';

const userColumnDefs: ColumnDef<User>[] = [
  {
    type: 'index',
    head: '',
    width: 'w-[3%]',
    displayFn: (u) => u.idx,
  },
  {
    type: 'data',
    head: 'name',
    width: 'w-[19%]',
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
    width: 'w-[15%]',
    displayFn: (u) => (
      <UserRoleCell
        userRole={u.role}
        options={['user', 'admin', 'editor', 'writer']}
      />
    ),
  },
  { type: 'data', head: 'email', width: 'w-[20%]', displayFn: (u) => u.email },
  { type: 'data', head: 'topics', width: 'w-[22%]', displayFn: (u) => <UserTopicsCell topics={u?.topics} /> },
  {
    type: 'data',
    head: 'joined at',
    width: 'w-[13%]',
    displayFn: (u) => <p className="whitespace-nowrap">{format(u.createdAt, 'yyyy-MM-dd')}</p>,
  },
  {
    type: 'data',
    head: '',
    width: 'w-[8%]',
    displayFn: (u) => {
      if (u.role === 'user') return;

      const clickHandler = (e: MouseEvent) => {
        // TODO: send message
      };

      return (
        <Button
          buttonType="muted"
          buttonFunction="send"
          onClick={clickHandler}
        ></Button>
      );
    },
  },
];

export default userColumnDefs;

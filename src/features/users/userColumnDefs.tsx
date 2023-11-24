import { format } from 'date-fns';
import { ColumnDef } from '../../utils/types';
import { User } from './Users';

const userColumnDefs: ColumnDef<User>[] = [
  {
    head: '',
    displayFn: (u) => u.idx,
  },
  {
    head: 'name',
    displayFn: (u) => (
      <div className="flex items-center gap-2">
        <div className="aspect-square w-8 overflow-clip rounded-full">
          {u?.avatar ? (
            <img
              className="w-full object-cover"
              src={u.avatar}
              alt="avatar"
            />
          ) : (
            <span className="icon-[lucide--user-circle] h-full w-full text-zinc-300">&nbsp;</span>
          )}
        </div>
        <p className="whitespace-nowrap">
          {u.firstName} {u.lastName}
        </p>
      </div>
    ),
  },
  { head: 'role', displayFn: (u) => <p className="capitalize">{u.role}</p> },
  { head: 'topics', displayFn: (u) => (u?.topics ? u.topics[0].name : '') },
  { head: 'email', displayFn: (u) => u.email },
  { head: 'joined at', displayFn: (u) => <p className="whitespace-nowrap">{format(u.createdAt, 'yyyy-MM-dd')}</p> },
  {
    head: '',
    displayFn: (u) => {
      return (
        <button className="flex rounded-md transition-colors hover:bg-zinc-100 active:bg-zinc-200/50">
          <span className="icon-[lucide--more-vertical] m-2 text-zinc-500 "></span>
        </button>
      );
    },
  },
];

export default userColumnDefs;

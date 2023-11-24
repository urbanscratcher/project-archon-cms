import { format } from 'date-fns';
import { ColumnDef } from '../../utils/types';
import { User } from '../../pages/Users';

const userColumnDefs: ColumnDef<User>[] = [
  {
    type: 'index',
    head: '',
    displayFn: (u) => u.idx,
  },
  {
    type: 'data',
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
  { type: 'data', head: 'role', displayFn: (u) => <p className="capitalize">{u.role}</p> },
  { type: 'data', head: 'topics', displayFn: (u) => (u?.topics ? u.topics[0].name : '') },
  { type: 'data', head: 'email', displayFn: (u) => u.email },
  {
    type: 'data',
    head: 'joined at',
    displayFn: (u) => <p className="whitespace-nowrap">{format(u.createdAt, 'yyyy-MM-dd')}</p>,
  },
  {
    type: 'data',
    head: '',
    displayFn: (u) => {
      return (
        <button className="ml-auto mr-0 flex rounded-md transition-colors hover:bg-zinc-100 active:bg-zinc-200/50">
          <span className="icon-[lucide--more-vertical] m-2 text-zinc-500"></span>
        </button>
      );
    },
  },
];

export default userColumnDefs;

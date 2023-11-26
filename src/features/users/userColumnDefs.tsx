import { format } from 'date-fns';
import { User } from '../../pages/Users';
import { ColumnDef } from '../../utils/types';

const userColumnDefs: ColumnDef<User>[] = [
  {
    type: 'index',
    head: '',
    widthPercent: 5,
    displayFn: (u) => u.idx,
  },
  {
    type: 'data',
    head: 'name',
    widthPercent: 20,
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
  { type: 'data', head: 'email', widthPercent: 25, displayFn: (u) => u.email },
  { type: 'data', head: 'topics', widthPercent: 20, displayFn: (u) => (u?.topics ? u.topics[0].name : '') },
  {
    type: 'data',
    head: 'joined at',
    widthPercent: 15,
    displayFn: (u) => <p className="whitespace-nowrap">{format(u.createdAt, 'yyyy-MM-dd')}</p>,
  },
  { type: 'data', head: 'role', widthPercent: 10, displayFn: (u) => <p className="capitalize">{u.role}</p> },
  {
    type: 'data',
    head: '',
    widthPercent: 5,
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

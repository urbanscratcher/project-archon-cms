import { format } from 'date-fns';
import { Insight } from '../../models/Insights';
import { type ColumnDef } from '../../utils/types';
import UserCellName from '../users/UserCellName';
import Badge from '../../ui/Badge';

export const insightColumnDefs: ColumnDef<Insight>[] = [
  {
    type: 'index',
    head: 'idx',
    displayFn: (i) => <p className="text-center text-sm text-zinc-500">{i.idx}</p>,
    style: 'w-[4%]',
  },
  {
    type: 'data',
    head: 'topic',
    style: 'w-[13%]',
    displayFn: (i) => <Badge text={i.topic.name} />,
  },
  {
    type: 'data',
    head: 'title',
    style: 'w-[43%]',
    displayFn: (i) => <p className="whitespace-wrap">{i.title}</p>,
  },
  {
    type: 'data',
    head: 'creator',
    style: 'w-[18%]',
    displayFn: (i) => (
      <UserCellName
        avatar={i?.createdBy.avatar}
        firstName={i.createdBy.firstName}
        lastName={i.createdBy.lastName}
      />
    ),
  },
  {
    type: 'data',
    head: 'created at',
    sortKey: 'idx',
    style: 'w-[22%]',
    displayFn: (i) => <p className="whitespace-nowrap">{format(i.createdAt, 'yyyy-MM-dd hh:mm:ss')}</p>,
  },
];

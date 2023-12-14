import { format } from 'date-fns';
import { Insight } from '../../models/Insights';
import { type ColumnDef } from '../../utils/types';

export const insightColumnDefs: ColumnDef<Insight>[] = [
  {
    type: 'index',
    head: 'idx',
    displayFn: (i) => <p className="text-center text-sm text-zinc-500">{i.idx}</p>,
    style: 'w-[7%]',
  },
  {
    type: 'data',
    head: 'topic',
    style: 'w-[10%]',
    displayFn: (i) => <p>{i.topic.name}</p>,
  },
  {
    type: 'data',
    head: 'title',
    style: 'w-[43%]',
    displayFn: (i) => <p className="whitespace-wrap">{i.title}</p>,
  },
  {
    type: 'data',
    head: 'created by',
    style: 'w-[18%]',
    displayFn: (i) => (
      <p>
        {i.createdBy.firstName} {i.createdBy.lastName}
      </p>
    ),
  },
  {
    type: 'data',
    head: 'created at',
    sortable: true,
    sortKey: 'created_at',
    style: 'w-[22%]',
    displayFn: (i) => <p className="whitespace-nowrap">{format(i.createdAt, 'yyyy-MM-dd / hh:mm a')}</p>,
  },
];

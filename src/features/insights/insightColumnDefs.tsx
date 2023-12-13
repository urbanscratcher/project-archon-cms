import { Insight } from '../../models/Insights';
import { type ColumnDef } from '../../utils/types';

export const insightColumnDefs: ColumnDef<Insight>[] = [
  {
    type: 'index',
    head: 'idx',
    displayFn: (i) => <p className="text-center text-sm text-zinc-500">{i.idx}</p>,
    sortable: true,
    sortKey: 'idx',
    style: 'w-[7%]',
  },
  {
    type: 'data',
    head: 'topic',
    sortable: true,
    sortKey: 'topic',
    style: 'w-[10%]',
    displayFn: (i) => <p>{i.topic.name}</p>,
  },
  {
    type: 'data',
    head: 'title',
    sortable: true,
    sortKey: 'title',
    style: 'w-[25%]',
    displayFn: (i) => <p className="whitespace-nowrap">{i.title}</p>,
  },
  {
    type: 'data',
    head: 'summary',
    style: 'w-[15%]',
    displayFn: (i) => <p className="whitespace-nowrap">{i.summary}</p>,
  },

  {
    type: 'data',
    head: 'created by',
    style: 'w-[20%]',
    displayFn: (i) => (
      <p>
        {i.user.firstName} {i.user.lastName}
      </p>
    ),
  },
  {
    type: 'data',
    head: 'created at',
    sortable: true,
    sortKey: 'created_at',
    style: 'w-[18%]',
    displayFn: (i) => <p className="whitespace-nowrap">{i.createdAt}</p>,
  },
];

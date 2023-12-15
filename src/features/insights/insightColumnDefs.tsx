import { format } from 'date-fns';
import { Insight } from '../../models/Insights';
import { type ColumnDef } from '../../utils/types';
import UserCellName from '../../ui/UserBadge';
import Badge from '../../ui/Badge';
import InsightsCoverCell from './InsightsCoverCell';
import InsightsCoverMainCell from './InsightsCoverMainCell';

export const insightColumnDefs: ColumnDef<Insight>[] = [
  {
    type: 'menu',
    head: 'main',
    displayFn: (i) => <InsightsCoverMainCell insight={i} />,
    style: 'w-[5rem]',
  },
  {
    type: 'menu',
    head: 'cover',
    displayFn: (i) => <InsightsCoverCell insight={i} />,
    style: 'w-[5rem]',
  },
  {
    type: 'data',
    head: 'topic',
    style: 'w-[8rem]',
    displayFn: (i) => <Badge text={i.topic.name} />,
  },
  {
    type: 'data',
    head: 'title',
    style: 'w-[23rem]',
    displayFn: (i) => <p className="w-full truncate font-medium">{i.title}</p>,
  },
  {
    type: 'data',
    head: 'creator',
    style: 'w-[12rem]',
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
    style: 'w-auto',
    displayFn: (i) => <p className="whitespace-nowrap">{format(i.createdAt, 'yyyy-MM-dd hh:mm:ss')}</p>,
  },
];

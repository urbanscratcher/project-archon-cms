import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { InsightSchema } from '../../models/Insights';
import Error from '../../pages/Error';
import insightApi from '../../services/apiInsight';
import Badge from '../../ui/Badge';
import Spinner from '../../ui/Spinner';
import UserCellName from '../../ui/UserBadge';

function InsightDetail() {
  const { insightIdx } = useParams();

  if (!insightIdx) {
    return <Error />;
  }

  const {
    isLoading,
    data: insight,
    error,
  } = useQuery({ queryKey: ['insight', insightIdx], queryFn: () => insightApi.getDetail(+insightIdx) });

  if (error) return <Error />;
  if (isLoading) return <Spinner />;

  if (!insight) return;
  const insightDetail = InsightSchema.safeParse(insight);
  if (!insightDetail.success) return <Error />;
  const { data: insightData } = insightDetail;
  const { idx, title, thumbnail, content, summary, topic, createdBy, createdAt, editedAt } = insightData;

  return (
    <div className="mx-auto flex w-full max-w-[55rem] flex-col gap-2">
      <Badge text={topic.name} />
      <h2>{title}</h2>
      <p className="text-sm">{summary}</p>
      <img
        src={thumbnail}
        alt={title}
        className={'max-h-80 w-fit'}
      />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <UserCellName
        avatar={createdBy.avatar}
        firstName={createdBy.firstName}
        lastName={createdBy.lastName}
      />
      <div className="flex gap-2">
        <div>Created at</div>
        <div>{format(createdAt, 'yyyy-MM-dd hh:mm:ss a')}</div>
      </div>
      {editedAt && (
        <div className="flex gap-2">
          <div className="capitalize">Edited at</div>
          <div>{format(editedAt, 'yyyy-MM-dd hh:mm:ss a')}</div>
        </div>
      )}
    </div>
  );
}

export default InsightDetail;

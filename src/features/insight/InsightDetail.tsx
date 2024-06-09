import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import { InsightSchema } from '../../models/Insights';
import Error from '../../pages/Error';
import insightApi from '../../services/apiInsight';
import Badge from '../../ui/Badge';
import Spinner from '../../ui/Spinner';
import UserCellName from '../../ui/UserBadge';
import Button from '../../ui/button/Button';
import useDeleteInsight from './useDeleteInsight';

function InsightDetail() {
  const { insightIdx } = useParams();
  const navigate = useNavigate();

  if (!insightIdx) {
    return <Error />;
  }

  const {
    isLoading,
    data: insight,
    error,
  } = useQuery({ queryKey: ['insight', insightIdx], queryFn: () => insightApi.getDetail(+insightIdx) });

  const { mutate: deleteInsight } = useDeleteInsight();

  if (error) return <Error />;
  if (isLoading) return <Spinner />;
  if (!insight) return;

  const insightDetail = InsightSchema.safeParse(insight);
  if (!insightDetail.success) return <Error />;
  const { data: insightData } = insightDetail;
  const { idx, title, thumbnail, content, summary, topic, createdBy, createdAt, editedAt } = insightData;

  return (
    <div className="mx-auto flex w-full max-w-[55rem] items-start gap-1">
      <Button
        className="text-zinc-600 dark:text-zinc-400"
        buttonType="borderless"
        size="icon"
        onClick={() => navigate('/insights')}
      >
        <span className="icon-[lucide--arrow-left]"></span>
      </Button>
      <div className="flex w-full flex-col gap-2">
        <Badge text={topic.name} />
        <p className="py-2 text-4xl font-semibold">{title}</p>
        <p className="text-sm text-zinc-500">{summary}</p>
        <hr />

        <img
          src={thumbnail}
          alt={title}
          className={'max-h-80 w-fit self-center'}
        />
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="content"
        />
        <hr />
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 text-xs text-zinc-500">
              <div>Created at</div>
              <div>{format(createdAt, 'yyyy-MM-dd hh:mm:ss a')}</div>
            </div>
            {editedAt && (
              <div className="flex gap-2 text-xs text-zinc-500">
                <div className="capitalize">Edited at</div>
                <div>{format(editedAt, 'yyyy-MM-dd hh:mm:ss a')}</div>
              </div>
            )}
            <UserCellName
              avatar={createdBy.avatar}
              firstName={createdBy.firstName}
              lastName={createdBy.lastName}
            />
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              buttonType="muted"
              className="h-fit w-fit"
              onClick={() => navigate(`/insights/${idx}/edit`)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              buttonType="muted"
              className="h-fit w-fit"
              onClick={() => deleteInsight(+insightIdx)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsightDetail;

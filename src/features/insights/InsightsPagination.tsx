import Pagination from '../../ui/Pagination';
import { useInsightsFilterStore } from './insightsStore';

function InsightsPagination() {
  const { limit, setLimit, offset, setOffset, total } = useInsightsFilterStore();
  return (
    <div className="flex justify-between">
      <p className=" text-zinc-500">Total {total}</p>
      <Pagination
        onSetLimit={setLimit}
        onSetOffset={setOffset}
        limit={limit}
        offset={offset}
        total={total}
      />
    </div>
  );
}
export default InsightsPagination;

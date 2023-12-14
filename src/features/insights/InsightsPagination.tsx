import Pagination from '../../ui/Pagination';
import { useInsightsFilterStore } from './insightsStore';

function InsightsPagination() {
  const { limit, setLimit, offset, setOffset, total } = useInsightsFilterStore();
  return (
    <Pagination
      onSetLimit={setLimit}
      onSetOffset={setOffset}
      limit={limit}
      offset={offset}
      total={total}
    />
  );
}
export default InsightsPagination;

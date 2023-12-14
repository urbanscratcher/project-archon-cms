import SearchFilter from '../../ui/SearchFilter';
import { useInsightsFilterStore } from './insightsStore';

export function InsightsFilterSearch() {
  const { setSearchFilter, searchFilter } = useInsightsFilterStore();

  return (
    <SearchFilter
      placeholder="Search a title or name..."
      onSetSearchFilter={setSearchFilter}
      searchFilter={searchFilter}
    />
  );
}

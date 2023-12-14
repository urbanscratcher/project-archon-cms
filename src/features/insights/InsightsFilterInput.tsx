import InputAction from '../../ui/input/InputAction';
import { useInsightsFilterStore } from './insightsStore';

function InsightsFilterInput() {
  const { setSearchFilter } = useInsightsFilterStore();

  return (
    <InputAction
      placeholder="Search a title..."
      setAction={setSearchFilter}
    />
  );
}

export default InsightsFilterInput;

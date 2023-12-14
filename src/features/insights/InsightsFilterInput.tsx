import InputAction from '../../ui/input/InputAction';
import { useInsightsFilterStore } from './insightsStore';

function InsightsFilterInput() {
  const { setSearchFilter } = useInsightsFilterStore();

  return (
    <InputAction
      placeholder="Search a title or writer's name..."
      setAction={setSearchFilter}
    />
  );
}

export default InsightsFilterInput;

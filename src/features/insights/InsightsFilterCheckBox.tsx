import CheckBox from '../../ui/CheckBox';
import { useInsightsFilterStore } from './insightsStore';

function InsightsFilterCheckBox() {
  const { coverOnly, setCoverOnly } = useInsightsFilterStore();

  const onClicked = () => {
    setCoverOnly(!coverOnly);
  };

  return (
    <CheckBox
      id="filterCovers"
      labelText={'Covers Only'}
      onClicked={onClicked}
      clicked={false}
    />
  );
}

export default InsightsFilterCheckBox;

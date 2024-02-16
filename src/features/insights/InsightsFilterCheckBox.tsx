import { MouseEvent } from 'react';
import CheckBox from '../../ui/CheckBox';
import { useInsightsFilterStore } from './insightsStore';

function InsightsFilterCheckBox() {
  const { coverOnly, setCoverOnly } = useInsightsFilterStore();

  const onClicked = (e: MouseEvent) => {
    setCoverOnly(!coverOnly);
  };

  return (
    <CheckBox
      id="filterCovers"
      labelText={'Covers Only'}
      onClicked={(e) => onClicked(e)}
      clicked={false}
    />
  );
}

export default InsightsFilterCheckBox;

import { Insight } from '../../models/Insights';
import ToggleBtn from '../../ui/button/ToggleBtn';

function InsightsCoverCell({ insight }: { insight: Insight }) {
  return <ToggleBtn />;
}

export default InsightsCoverCell;

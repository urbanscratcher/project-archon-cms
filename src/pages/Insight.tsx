import InsightDetail from '../features/insight/InsightDetail';
import { MainBody } from '../ui/MainBody';
import { MainLayout } from '../ui/MainLayout';

function Insight() {
  return (
    <MainLayout>
      <MainBody>
        <InsightDetail />
      </MainBody>
    </MainLayout>
  );
}

export default Insight;

import InsightsFilter from '../features/insights/InsightsFilter';
import InsightsFilterInput from '../features/insights/InsightsFilterInput';
import InsightsFilterTopic from '../features/insights/InsightsFilterTopic';
import InsightsPagination from '../features/insights/InsightsPagination';
import InsightsTableBody from '../features/insights/InsightsTableBody';
import InsightsTableHead from '../features/insights/InsightsTableHead';
import MainHead from '../ui/Head';
import { MainBody } from '../ui/MainBody';
import { MainLayout } from '../ui/MainLayout';
import Table from '../ui/table/Table';

function Insights() {
  return (
    <MainLayout>
      <MainHead>
        <MainHead.Title>Insights</MainHead.Title>
        <MainHead.Description>A list of insights to be managed</MainHead.Description>
      </MainHead>
      <MainBody>
        <InsightsFilter>
          <InsightsFilterInput />
          <InsightsFilterTopic />
        </InsightsFilter>
        <Table>
          <Table.Head>
            <Table.HeadRow>
              <InsightsTableHead />
            </Table.HeadRow>
          </Table.Head>
          <InsightsTableBody />
        </Table>
        <InsightsPagination />
      </MainBody>
    </MainLayout>
  );
}

export default Insights;

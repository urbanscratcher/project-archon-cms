import MainHead from '../ui/Head';
import { MainBody } from '../ui/MainBody';
import { MainLayout } from '../ui/MainLayout';
import Table from '../ui/table/Table';
import { insightColumnDefs } from '../features/insights/insightColumnDefs';
import InsightsTableBody from '../features/insights/InsightsTableBody';
import SortableColumnBtn from '../ui/button/SortableColumnBtn';
import InsightsFilter from '../features/insights/InsightsFilter';
import InsightsFilterInput from '../features/insights/InsightsFilterInput';
import InsightsFilterTopic from '../features/insights/InsightsFilterTopic';

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
              {insightColumnDefs.map((def) => (
                <Table.HeadCell
                  key={def.head}
                  style={def.style}
                >
                  {def.sortable ? <SortableColumnBtn def={def} /> : def.head}
                </Table.HeadCell>
              ))}
            </Table.HeadRow>
          </Table.Head>
          <InsightsTableBody />
        </Table>
      </MainBody>
    </MainLayout>
  );
}

export default Insights;

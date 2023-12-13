import MainHead from '../ui/Head';
import { MainBody } from '../ui/MainBody';
import { MainLayout } from '../ui/MainLayout';
import Table from '../ui/table/Table';
import { insightColumnDefs } from '../features/insights/insightColumnDefs';
import InsightsTableBody from '../features/insights/InsightsTableBody';

function Insights() {
  return (
    <MainLayout>
      <MainHead>
        <MainHead.Title>Insights</MainHead.Title>
        <MainHead.Description>A list of insights to be managed</MainHead.Description>
      </MainHead>
      <MainBody>
        <Table>
          <Table.HeadRow>
            {insightColumnDefs.map((def) => (
              <Table.HeadCell key={def.head}>{def.head}</Table.HeadCell>
            ))}
          </Table.HeadRow>
          <InsightsTableBody />
        </Table>
      </MainBody>
    </MainLayout>
  );
}

export default Insights;

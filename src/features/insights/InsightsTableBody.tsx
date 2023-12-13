import { Insight, InsightsSchema } from '../../models/Insights';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/table/Table';
import { insightColumnDefs } from './insightColumnDefs';
import useInsights from './useInsights';

function InsightsTableBody() {
  const { insights, isLoading, error } = useInsights();

  if (isLoading) {
    return (
      <Table.BodyFull>
        <Spinner />
      </Table.BodyFull>
    );
  }

  if (error) return <Table.BodyFull>{error.message}</Table.BodyFull>;

  if (insights?.total <= 0) return <Table.BodyFull>No Data Found</Table.BodyFull>;

  const insightList = InsightsSchema.parse(insights).data;

  return (
    <>
      {insights && (
        <Table.Body>
          {insightList.map((row: Insight) => (
            <Table.Row key={row.idx}>
              {insightColumnDefs.map((def) => (
                <Table.Cell key={`${def.head}_${row.idx}`}>{def.displayFn(row)}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      )}
    </>
  );
}

export default InsightsTableBody;

import { useEffect, useState } from 'react';
import { Insight, InsightsSchema } from '../../models/Insights';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/table/Table';
import { insightColumnDefs } from './insightColumnDefs';
import { useInsightsFilterStore } from './insightsStore';
import useInsights from './useInsights';
import { QueryParam } from '../../models/QueryParam';

const makeQueryParams = (
  searchFilter?: string | null | undefined,
  selectedTopicIdx?: number,
  offset?: number,
  limit?: number,
  sorts?: string[],
) => {
  const andConditions = [];
  const orConditions: any[] = [];

  if (searchFilter && searchFilter !== '') {
    andConditions.push({ title: `like:${searchFilter}` });
  }

  if (selectedTopicIdx) {
    andConditions.push({ topic_idx: `${selectedTopicIdx}` });
  }

  const filterQuery = {
    and: andConditions.length <= 0 ? undefined : andConditions,
    or: orConditions.length <= 0 ? undefined : orConditions,
  };

  const sortsQuery = !sorts || sorts?.length <= 0 ? undefined : sorts;

  const queryParams = { filter: filterQuery, offset: offset, limit: limit, sorts: sortsQuery };

  return queryParams;
};

function InsightsTableBody() {
  const { searchFilter, selectedTopic, offset, limit, sorts, setTotal } = useInsightsFilterStore();
  const [queryParams, setQueryParams] = useState<QueryParam>(
    makeQueryParams(searchFilter, selectedTopic?.idx, offset, limit, sorts),
  );

  useEffect(() => {
    setQueryParams(makeQueryParams(searchFilter, selectedTopic?.idx, offset, limit, sorts));
  }, [searchFilter, selectedTopic, offset, limit, makeQueryParams, sorts]);

  const { insights, isLoading, error } = useInsights(queryParams);

  useEffect(() => {
    insights && setTotal(insights.total);
  }, [insights?.total]);

  if (error) return <Table.BodyFull>{error.message}</Table.BodyFull>;
  if (isLoading)
    return (
      <Table.BodyFull>
        <Spinner />
      </Table.BodyFull>
    );
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

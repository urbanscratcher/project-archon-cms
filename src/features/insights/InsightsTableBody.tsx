import { useQueryClient } from '@tanstack/react-query';
import { MouseEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Insight, InsightsSchema } from '../../models/Insights';
import { QueryParam } from '../../models/QueryParam';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/table/Table';
import { insightColumnDefs } from './insightColumnDefs';
import { useInsightsFilterStore } from './insightsStore';
import useInsights from './useInsights';

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
    andConditions.push({ first_name: `like:${searchFilter}` });
    andConditions.push({ last_name: `like:${searchFilter}` });
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

const makeQueryParamsForCovers = (indice: number[], offset?: number, limit?: number) => {
  const andConditions = [];
  const orConditions: any[] = [];

  for (const idx of indice) {
    andConditions.push({ insight_idx: `${idx}` });
  }

  const filterQuery = {
    and: andConditions.length <= 0 ? undefined : andConditions,
    or: orConditions.length <= 0 ? undefined : orConditions,
  };

  const queryParams = { filter: filterQuery, offset: offset, limit: limit };

  return queryParams;
};

function InsightsTableBody() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const covers = queryClient.getQueryData(['covers']);
  const coversIndice = covers ? covers?.data.map((c) => c.insight.idx) : [];

  const { searchFilter, selectedTopic, offset, limit, sorts, setTotal, coverOnly, setCoverOnly } =
    useInsightsFilterStore();
  const [queryParams, setQueryParams] = useState<QueryParam>(
    makeQueryParams(searchFilter, selectedTopic?.idx, offset, limit, sorts),
  );

  // reset cover only false
  useEffect(() => {
    setCoverOnly(false);
  }, []);

  // cover only filter
  useEffect(() => {
    if (coverOnly) {
      setQueryParams(makeQueryParamsForCovers(coversIndice, offset, limit));
    } else {
      setQueryParams(makeQueryParams(searchFilter, selectedTopic?.idx, offset, limit, sorts));
    }
  }, [coverOnly, setQueryParams, makeQueryParams, searchFilter, selectedTopic, offset, limit, sorts, covers]);

  // normal filters
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

  function clickHandler(e: MouseEvent, idx: number) {
    navigate(`/insights/${idx}`);
  }

  return (
    <>
      {insights && (
        <Table.Body>
          {insightList.map((row: Insight) => (
            <Table.Row key={row.idx}>
              {insightColumnDefs.map((def) => (
                <Table.Cell
                  key={`${def.head}_${row.idx}`}
                  onClick={def.head === 'title' ? (e) => clickHandler(e, row.idx) : undefined}
                  className={def.head === 'title' ? 'cursor-pointer' : ''}
                >
                  {def.displayFn(row)}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      )}
    </>
  );
}

export default InsightsTableBody;

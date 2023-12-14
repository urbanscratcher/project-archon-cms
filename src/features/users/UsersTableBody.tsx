import { useEffect, useState } from 'react';
import { QueryParam } from '../../models/QueryParam';
import { User, UsersSchema } from '../../models/Users';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/table/Table';
import useUsers from './useUsers';
import userColumnDefs from './userColumnDefs';
import { useUserFilterStore } from './usersStore';

const makeQueryParams = (
  searchFilter?: string | null | undefined,
  selectedRoles?: string[],
  offset?: number,
  limit?: number,
  sorts?: string[],
) => {
  const andConditions = [];
  const orConditions: any[] = [];

  if (searchFilter && searchFilter !== '') {
    andConditions.push({ first_name: `like:${searchFilter}` });
    andConditions.push({ last_name: `like:${searchFilter}` });
    andConditions.push({ email: `like:${searchFilter}` });
  }

  if (selectedRoles && selectedRoles?.length > 0) {
    selectedRoles.forEach((r) => {
      orConditions.push({ role: r });
    });
  }

  const filterQuery = {
    and: andConditions.length <= 0 ? undefined : andConditions,
    or: orConditions.length <= 0 ? undefined : orConditions,
  };

  const sortsQuery = !sorts || sorts?.length <= 0 ? undefined : sorts;

  const queryParams = { filter: filterQuery, offset: offset, limit: limit, sorts: sortsQuery };

  return queryParams;
};

function UsersTableBody() {
  const { searchFilter, selectedRoles, offset, limit, sorts, setTotal } = useUserFilterStore();

  const [queryParams, setQueryParams] = useState<QueryParam>(
    makeQueryParams(searchFilter, selectedRoles, offset, limit, sorts),
  );

  useEffect(() => {
    setQueryParams(makeQueryParams(searchFilter, selectedRoles, offset, limit, sorts));
  }, [searchFilter, selectedRoles, offset, limit, makeQueryParams, sorts]);

  const { users, isLoading, error } = useUsers(queryParams);

  useEffect(() => {
    users && setTotal(users.total);
  }, [users?.total]);

  if (error) return <Table.BodyFull>{error.message}</Table.BodyFull>;
  if (isLoading) {
    return (
      <Table.BodyFull>
        <Spinner />
      </Table.BodyFull>
    );
  }
  if (users?.total <= 0) return <Table.BodyFull>No Data Found</Table.BodyFull>;

  const userList = UsersSchema.parse(users).data;

  return (
    <>
      {users && (
        <Table.Body>
          {userList.map((row: User) => (
            <Table.Row key={row.idx}>
              {userColumnDefs.map((def) => (
                <Table.Cell key={`${def.head}_${row.idx}`}>{def.displayFn(row)}</Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      )}
    </>
  );
}

export default UsersTableBody;

import { useEffect, useState } from 'react';
import { QueryParam } from '../../models/QueryParam';
import { User, UsersSchema } from '../../models/Users';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/table/Table';
import { makeQueryParams } from '../../utils/helpers';
import useUsers from './useUsers';
import userColumnDefs from './userColumnDefs';
import { useUserFilterStore } from './usersStore';

function UsersTableBody() {
  const { searchFilter, selectedRoles, offset, limit, sorts, setTotal } = useUserFilterStore();

  const [queryParams, setQueryParams] = useState<QueryParam>(
    makeQueryParams(searchFilter ?? '', selectedRoles, offset, limit, sorts),
  );

  useEffect(() => {
    setQueryParams(makeQueryParams(searchFilter ?? '', selectedRoles, offset, limit, sorts));
  }, [searchFilter, selectedRoles, offset, limit, makeQueryParams, sorts]);

  const { users, isLoading, error } = useUsers(queryParams);

  useEffect(() => {
    users && setTotal(users.total);
  }, [users?.total]);

  if (isLoading) {
    return (
      <Table.BodyFull>
        <Spinner />
      </Table.BodyFull>
    );
  }

  if (error) return <Table.BodyFull>{error.message}</Table.BodyFull>;
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

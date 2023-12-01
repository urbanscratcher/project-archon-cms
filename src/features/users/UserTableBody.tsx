import { useEffect } from 'react';
import { User, UsersSchema } from '../../models/Users';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import { TableBodyFull } from '../../ui/TableBodyFull';
import useUsers from './useUsers';
import userColumnDefs from './userColumnDefs';

export type UserTableProps = {
  queryParams: any;
  setTotal: (total: number) => void;
};

function UserTableBody({ queryParams, setTotal }: UserTableProps) {
  const { users, isLoading, error } = useUsers(queryParams);

  useEffect(() => {
    users && setTotal(users.total);
  }, [users?.total]);

  if (isLoading) {
    return (
      <TableBodyFull>
        <Spinner />
      </TableBodyFull>
    );
  }

  if (error) return <TableBodyFull>{error.message}</TableBodyFull>;

  if (users?.total <= 0) return <TableBodyFull>No Data Found</TableBodyFull>;

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

export default UserTableBody;

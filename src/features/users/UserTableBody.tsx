import { useEffect } from 'react';
import { type User } from '../../pages/Topic';
import Spinner from '../../ui/Spinner';
import TableBody, { TableBodySimple } from '../../ui/table/TableBody';
import useUsers from './useUsers';
import userColumnDefs from './userColumnDefs';

export type UserTableProps = {
  queryParams: any;
  setTotal: (total: number) => void;
};

function UserTableBody({ queryParams, setTotal }: UserTableProps) {
  const { users, isLoading, error } = useUsers(queryParams);

  useEffect(() => {
    if (users?.total) setTotal(users.total);
  }, [users, setTotal]);

  if (isLoading)
    return (
      <TableBodySimple columnLength={userColumnDefs.length}>
        <Spinner />
      </TableBodySimple>
    );

  if (error)
    return (
      <TableBodySimple columnLength={userColumnDefs.length}>{/* <Error>{error.message}</Error> */}</TableBodySimple>
    );

  // data mapping
  let newData;
  let userList = [];

  if (users?.data) {
    newData = users.data.map((u: any): User => {
      return {
        idx: u.idx,
        firstName: u.first_name,
        lastName: u.last_name,
        email: u.email,
        role: u.role,
        avatar: u.avatar,
        topics: u.topics,
        createdAt: new Date(u.created_at),
      };
    });
    userList = { ...users, data: newData };
  }
  console.log('data mapping done!');

  return (
    <>
      {users && (
        <TableBody
          columnDefs={userColumnDefs}
          listData={userList}
        />
      )}
    </>
  );
}

export default UserTableBody;

import { useEffect } from 'react';
import { type User } from '../../pages/Users';
import Error from '../../pages/Error';
import Spinner from '../../ui/Spinner';
import TableBody, { TableBodySimple } from '../../ui/table/TableBody';
import { SelectOptions } from './UserRoleFilter';
import useUsers from './useUsers';
import userColumnDefs from './userColumnDefs';

export type UserTableProps = {
  inputFilter?: string;
  roleFilter?: SelectOptions[];
  sorts?: [
    {
      field: string;
      descending?: boolean;
    },
  ];
  offset?: number;
  limit?: number;
  onSetTotal: (total: number) => void;
};

function UserTableBody({ sorts, inputFilter, roleFilter, offset, limit, onSetTotal }: UserTableProps) {
  const filterQuery = (inputFilter?: string, roleFilter?: SelectOptions[]) => {
    if (!inputFilter && !roleFilter) return undefined;

    const andConditions = [];
    const orConditions: any[] = [];

    if (inputFilter) {
      andConditions.push({ first_name: `like:${inputFilter}` });
      andConditions.push({ last_name: `like:${inputFilter}` });
      andConditions.push({ email: `like:${inputFilter}` });
    }

    if (roleFilter && roleFilter?.length > 0) {
      const selects = roleFilter.filter((r) => r.selected === true);
      selects.forEach((s) => {
        orConditions.push({ role: s.item });
      });
    }

    return {
      and: andConditions.length <= 0 ? undefined : andConditions,
      or: orConditions.length <= 0 ? undefined : orConditions,
    };
  };

  const queryParams = { filter: filterQuery(inputFilter, roleFilter), offset: offset, limit: limit };

  const { users, isLoading, error } = useUsers(queryParams);

  if (isLoading)
    return (
      <TableBodySimple columnLength={userColumnDefs.length}>
        <Spinner />
      </TableBodySimple>
    );

  if (error)
    return (
      <TableBodySimple columnLength={userColumnDefs.length}>
        <Error>{error.message}</Error>
      </TableBodySimple>
    );

  // data passing
  onSetTotal(users.total);

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

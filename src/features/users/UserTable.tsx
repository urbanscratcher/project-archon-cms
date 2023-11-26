import { type User } from '../../pages/Users';
import Error from '../../ui/Error';
import Spinner from '../../ui/Spinner';
import TableBody, { TableBodySimple } from '../../ui/table/TableBody';
import { type ListData } from '../../utils/types';
import useUsers from './useUsers';
import userColumnDefs from './userColumnDefs';

export type UserTableProps = {
  inputFilter?: string;
  roleFilter?: any[];
  sorts?: [
    {
      field: string;
      descending?: boolean;
    },
  ];
};

function UserTableBody({ sorts, inputFilter, roleFilter }: UserTableProps) {
  const filterQuery = (inputFilter?: string, roleFilter?: any[]) => {
    // if(roleFilter && roleFilter.length <= 0)

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

  const { users, isLoading, error } = useUsers({ filter: filterQuery(inputFilter, roleFilter) });

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

  // data mapping
  const newData = users.data.map((u: any): User => {
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
  const userList: ListData<User> = { ...users, data: newData };

  return (
    <TableBody
      columnDefs={userColumnDefs}
      listData={userList}
    />
  );
}

export default UserTableBody;

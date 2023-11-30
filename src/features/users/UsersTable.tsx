import { useCallback } from 'react';
import UserTableBody from './UserTableBody';
import userColumnDefs from './userColumnDefs';
import { useUserFilterStore } from './usersStore';
import Table from '../../ui/table/Table';
import TableBox from '../../ui/table/TableBox';
import { TableHead } from '../../ui/table/TableHead';

function UsersTable() {
  const { setTotal, searchFilter, selectedRoles, offset, limit } = useUserFilterStore();

  const makeFilterQuery = useCallback((inputFilter?: string, roleFilter?: string[]) => {
    if (!inputFilter && !roleFilter) return undefined;

    const andConditions = [];
    const orConditions: any[] = [];

    if (inputFilter) {
      andConditions.push({ first_name: `like:${inputFilter}` });
      andConditions.push({ last_name: `like:${inputFilter}` });
      andConditions.push({ email: `like:${inputFilter}` });
    }

    if (roleFilter && roleFilter?.length > 0) {
      roleFilter.forEach((r) => {
        orConditions.push({ role: r });
      });
    }

    return {
      and: andConditions.length <= 0 ? undefined : andConditions,
      or: orConditions.length <= 0 ? undefined : orConditions,
    };
  }, []);

  const queryParams = { filter: makeFilterQuery(searchFilter ?? '', selectedRoles), offset, limit };

  return (
    <TableBox>
      <Table>
        <TableHead columnDefs={userColumnDefs} />
        <UserTableBody
          queryParams={queryParams}
          setTotal={setTotal}
        />
      </Table>
    </TableBox>
  );
}

export default UsersTable;

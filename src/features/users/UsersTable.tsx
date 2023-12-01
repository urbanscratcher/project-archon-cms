import { useCallback } from 'react';
import Table from '../../ui/Table';
import UserTableBody from './UserTableBody';
import UserTableHead from './UserTableHead';
import { useUserFilterStore } from './usersStore';

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
    <Table>
      <UserTableHead />
      <UserTableBody
        queryParams={queryParams}
        setTotal={setTotal}
      />
    </Table>
  );
}

export default UsersTable;

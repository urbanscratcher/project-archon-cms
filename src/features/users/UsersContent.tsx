import UsersFilter from './UsersFilter';
import UsersPagination from './UsersPagination';
import UsersTable from './UsersTable';

function UsersContent() {
  return (
    <>
      <UsersFilter />
      <UsersTable />
      <UsersPagination />
    </>
  );
}

export default UsersContent;

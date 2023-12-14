import UsersFilter from '../features/users/UsersFilter';
import UsersFilterInput from '../features/users/UsersFilterInput';
import UsersFilterRole from '../features/users/UsersFilterRole';
import UsersPagination from '../features/users/UsersPagination';
import UsersTableBody from '../features/users/UsersTableBody';
import UsersTableHead from '../features/users/UsersTableHead';
import MainHead from '../ui/Head';
import { MainBody } from '../ui/MainBody';
import { MainLayout } from '../ui/MainLayout';
import Table from '../ui/table/Table';

function Users() {
  return (
    <MainLayout>
      <MainHead>
        <MainHead.Title>Users</MainHead.Title>
        <MainHead.Description>A list of users to be managed (only for admins)</MainHead.Description>
      </MainHead>
      <MainBody>
        <UsersFilter>
          <UsersFilterInput />
          <UsersFilterRole />
        </UsersFilter>
        <Table>
          <Table.Head>
            <Table.HeadRow>
              <UsersTableHead />
            </Table.HeadRow>
          </Table.Head>
          <UsersTableBody />
        </Table>
        <UsersPagination />
      </MainBody>
    </MainLayout>
  );
}

export default Users;

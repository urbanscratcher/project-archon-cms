import MainHead from '../ui/Head';
import { MainLayout } from '../ui/MainLayout';
import UsersContent from '../features/users/UsersContent';
import { MainBody } from '../ui/MainBody';

function Users() {
  return (
    <MainLayout>
      <MainHead>
        <MainHead.Title>Users</MainHead.Title>
        <MainHead.Description>A list of users to be managed (only for admins)</MainHead.Description>
      </MainHead>
      <MainBody>
        <UsersContent />
      </MainBody>
    </MainLayout>
  );
}

export default Users;

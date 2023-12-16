import useUser from '../hooks/useUser';
import { UserSchema } from '../models/Users';
import MainHead from '../ui/Head';
import { MainBody } from '../ui/MainBody';
import { MainLayout } from '../ui/MainLayout';
import { format } from 'date-fns';
import GlobalLoader from '../ui/GlobalLoader';

function Profile() {
  const token = localStorage.getItem('access_token') ?? null;
  const { user, isAuthenticated, isLoading } = useUser(token as string);

  const userObj = UserSchema.safeParse(user);

  return (
    <MainLayout>
      <MainHead>
        <MainHead.Title>Profile</MainHead.Title>
      </MainHead>
      <MainBody>
        {isLoading && <GlobalLoader />}
        {userObj.success && (
          <>
            <div>{userObj.data.role}</div>
            <div>{userObj.data.email}</div>
            <div>{userObj.data.firstName}</div>
            <div>{userObj.data.lastName}</div>
            <div>{userObj.data.avatar}</div>
            <div>{format(userObj.data.createdAt, 'yyyy-MM-dd')}</div>
          </>
        )}
      </MainBody>
    </MainLayout>
  );
}

export default Profile;

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AccountSetting from '../features/settings/AccountSetting';
import DisplaySetting from '../features/settings/DisplaySetting';
import ProfileSetting from '../features/settings/ProfileSetting';
import useUser from '../hooks/useUser';
import { User, UserSchema } from '../models/Users';
import GlobalLoader from '../ui/GlobalLoader';
import MainHead from '../ui/Head';
import { MainBody } from '../ui/MainBody';
import { MainLayout } from '../ui/MainLayout';
import Topbar from '../ui/Topbar';

function Settings() {
  const [userData, setUserData] = useState<User>({});
  const { setting } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem('access_token') ?? null;
  const { user, isAuthenticated, isLoading } = useUser(token as string);

  if (isLoading) return;
  const userObj = UserSchema.safeParse(user);

  useEffect(() => {
    if (userObj.success && !isLoading) {
      setUserData(userObj.data);
    }
  }, [user]);

  useEffect(() => {
    if (setting === '' || setting === undefined) {
      navigate('/settings/profile');
    }
  }, [setting]);

  return (
    <MainLayout>
      <MainHead>
        <MainHead.Title>Settings</MainHead.Title>
        <MainHead.Description>Manage personal account setitngs by preference</MainHead.Description>
      </MainHead>
      <MainBody>
        <Topbar />
        {isLoading && <GlobalLoader />}
        {userData && setting === 'profile' ? (
          <ProfileSetting user={userData} />
        ) : setting === 'account' ? (
          <AccountSetting user={userData} />
        ) : setting === 'display' ? (
          <DisplaySetting />
        ) : (
          ''
        )}
      </MainBody>
    </MainLayout>
  );
}

export default Settings;

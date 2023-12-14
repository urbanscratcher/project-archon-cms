import { type PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useStorage';
import useUser from '../hooks/useUser';
import { Avatar } from './Avatar';

export default function Profile() {
  const navigate = useNavigate();
  const [value, setValue] = useLocalStorage('access_token', '');
  if (!value) navigate('/signin');

  const { user } = useUser(value as string);

  return (
    <Profile.Container>
      <Avatar url={user.avatar} />
      {user.first_name} {user.last_name}
    </Profile.Container>
  );
}

Profile.Container = function Container({ children }: PropsWithChildren) {
  return <div className="flex items-center gap-3">{children}</div>;
};

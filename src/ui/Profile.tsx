import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { Avatar } from './Avatar';

function Profile() {
  console.log('Rendering...');

  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');
  if (!token) {
    navigate('/signin');
  }
  const { user } = useUser(token as string);

  return (
    <div className="flex items-center gap-3">
      <Avatar url={user.avatar} />
      <p>
        {user.first_name} {user.last_name}
      </p>
    </div>
  );
}

export default Profile;

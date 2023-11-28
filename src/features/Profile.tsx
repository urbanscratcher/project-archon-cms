import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';

type AvatarProps = {
  url: string;
};

function Avatar({ url }: AvatarProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="h-8 w-8 overflow-clip rounded-full">
      {loaded ? (
        <img
          className={`${loaded ? '' : 'invisible'}`}
          src={loaded ? url : ''}
          alt={'user avatar'}
          onLoad={() => setLoaded(true)}
        />
      ) : (
        <span className="icon-[lucide--user-circle] h-full w-full text-zinc-300"></span>
      )}
    </div>
  );
}

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

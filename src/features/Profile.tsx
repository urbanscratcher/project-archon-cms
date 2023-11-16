import { ReactNode } from 'react';

function Profile(): ReactNode {
  return (
    <div className="flex gap-2">
      <div>avatar</div>
      <p>Matten Snider</p>
    </div>
  );
}

export default Profile;

import { useEffect, type PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

function ProtectedRoute({ children }: PropsWithChildren) {
  const navigate = useNavigate();

  // load the authed user

  // if the user is not authed, redirect to login
  useEffect(() => {
    //
    // navigate('/signin');
  }, []);

  // loading state
  // <Spinner />;

  // render app if authed
  return children;
}

export default ProtectedRoute;

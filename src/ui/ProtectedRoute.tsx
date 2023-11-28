import { useEffect, type PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import Spinner from './Spinner';

function ProtectedRoute({ children }: PropsWithChildren) {
  const navigate = useNavigate();

  // if no token, redirect to signin
  const token = localStorage.getItem('access_token') ?? null;
  if (!token) navigate('/signin');

  console.log(token);

  // Load the authed user (or not)
  const { isAuthenticated, isLoading } = useUser(token as string);

  useEffect(() => {
    console.log('ProtectedRoute...', isAuthenticated, isLoading);

    if (!isAuthenticated && !isLoading) {
      navigate('/signin');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // loading state
  if (isLoading) {
    return (
      <div className="mx-auto my-auto">
        <p>Authenticating...</p>
        <Spinner />
      </div>
    );
  }

  // if there is a user, render a app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;

import { useEffect, type PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import Spinner from './Spinner';

function ProtectedRoute({ children }: PropsWithChildren) {
  const navigate = useNavigate();

  // if no token, redirect to signin
  const token = localStorage.getItem('access_token') ?? null;
  if (!token) navigate('/signin');

  // load the authed user
  const { isAuthenticated, isLoading } = useUser(token as string);
  useEffect(() => {
    // if not authenticated, redirect to signin
    if (!isAuthenticated && !isLoading) {
      navigate('/signin');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // loading state
  if (isLoading) {
    // page transition
    return (
      <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-2 text-center">
        <Spinner />
      </div>
    );
  }

  // if there is a user, render a app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;

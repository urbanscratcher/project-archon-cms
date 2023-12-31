import { useEffect, type PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import GlobalLoader from './GlobalLoader';

function ProtectedRoute({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token') ?? null;
  const { isAuthenticated, isLoading } = useUser(token as string);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/signin');
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <GlobalLoader />;
  if (isAuthenticated && !isLoading) return children;
}

export default ProtectedRoute;

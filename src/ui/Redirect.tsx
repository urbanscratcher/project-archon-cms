import { PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import GlobalLoader from './GlobalLoader';

function Redirect({ children }: PropsWithChildren) {
  const token = localStorage?.getItem('access_token') || null;
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useUser(token as string);

  useEffect(() => {
    if (isAuthenticated && !isLoading) navigate('/dashboard');
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <GlobalLoader />;
  if (!isAuthenticated && !isLoading) return children;
}

export default Redirect;

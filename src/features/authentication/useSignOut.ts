import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function useSignOut() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const onSignOut = useCallback(() => {
    queryClient.removeQueries({ queryKey: ['user'] });
    localStorage.removeItem('access_token');
    navigate('/signin');
  }, [navigate, queryClient]);

  return onSignOut;
}

export default useSignOut;

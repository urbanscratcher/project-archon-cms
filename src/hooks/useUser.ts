import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import userApi from '../services/apiUser';

// keep and enable to get user info
const useUser = (token: string) => {
  const queryClient = useQueryClient();

  // authenticate
  const { data: authenticatedUser, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      console.log('GET from API...');
      return userApi.getMe(token);
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    initialData: queryClient.getQueryData(['user']),
  });

  useEffect(() => {
    if (!authenticatedUser && !isLoading) {
      localStorage.removeItem('access_token');
      queryClient.removeQueries({ queryKey: ['user'] });
    }
    if (authenticatedUser) {
      queryClient.setQueryData(['user'], authenticatedUser);
    }
  }, [authenticatedUser, isLoading]);

  return { user: authenticatedUser, isAuthenticated: authenticatedUser ? true : false, isLoading };
};

export default useUser;

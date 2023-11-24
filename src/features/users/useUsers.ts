import { useQuery } from '@tanstack/react-query';
import userApi from '../../services/apiUser';

function useUsers() {
  const {
    isLoading,
    data: users,
    isError,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: () => userApi.getList(),
  });

  return { isLoading, users, isError, error };
}

export default useUsers;

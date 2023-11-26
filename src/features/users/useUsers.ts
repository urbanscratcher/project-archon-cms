import { useQuery } from '@tanstack/react-query';
import userApi, { QueryParams } from '../../services/apiUser';

function useUsers(params?: QueryParams) {
  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: ['users', params],
    queryFn: () => userApi.getList(params),
  });

  return { isLoading, users, error };
}

export default useUsers;

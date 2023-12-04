import { useQuery } from '@tanstack/react-query';
import { QueryParam } from '../../models/QueryParam';
import userApi from '../../services/apiUser';

function useUsers(params: QueryParam) {
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

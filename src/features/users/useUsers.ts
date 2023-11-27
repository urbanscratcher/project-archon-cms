import { useQuery } from '@tanstack/react-query';
import userApi, { QueryParams } from '../../services/apiUser';

function useUsers(params?: QueryParams) {
  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: ['users', params],
    queryFn: () => (params ? userApi.getList(params) : userApi.getAllList()),
  });

  return { isLoading, users, error };
}

export default useUsers;

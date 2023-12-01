import { useQuery } from '@tanstack/react-query';
import { QueryParam } from '../../models/QueryParam';
import userApi from '../../services/apiUser';

function useUsers(params?: QueryParam) {
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

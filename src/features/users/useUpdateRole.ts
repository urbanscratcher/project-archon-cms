import { useMutation, useQueryClient } from '@tanstack/react-query';
import userApi from '../../services/apiUser';

function useUpdateRole() {
  const queryClient = useQueryClient();

  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: ({ idx, body }: any) => {
      const accessToken = localStorage.getItem('access_token');
      return userApi.update(idx, body, accessToken as string);
    },
    onSuccess: (data) => {
      console.log('updated user success', data);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { isPending, mutate, error, isSuccess };
}

export default useUpdateRole;

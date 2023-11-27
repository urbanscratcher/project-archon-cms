import { useMutation } from '@tanstack/react-query';
import userApi from '../../services/apiUser';

function useUpdateUsers(body: any) {
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ idx, body }: any) => {
      return userApi.update(idx, body);
    },
    onSuccess: (data) => {
      console.log('update user success', data);
      // queryClient.setQueryData(['user'], data);
      // navigate('/dashboard', { replace: true });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { isPending, mutate, error };
}

export default useUpdateUsers;

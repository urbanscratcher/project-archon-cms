import { useMutation } from '@tanstack/react-query';
import userApi from '../../services/apiUser';

function useUpdateRole(body: any) {
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ idx, body }: any) => {
      const accessToken = localStorage.getItem('access_token');
      return userApi.update(idx, body, accessToken as string);
    },
    onSuccess: (data) => {
      console.log('update user success', data);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { isPending, mutate, error };
}

export default useUpdateRole;

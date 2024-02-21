import { useMutation, useQueryClient } from '@tanstack/react-query';
import insightApi from '../../services/apiInsight';

function useCreateInsight() {
  const token = localStorage.getItem('access_token') ?? '';
  const queryClient = useQueryClient();

  const { mutate, isPending, error, data } = useMutation({
    mutationFn: (body: any) => insightApi.create(body, token),
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ['insights'] });
      return res;
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { mutate, isPending, error, data };
}

export default useCreateInsight;

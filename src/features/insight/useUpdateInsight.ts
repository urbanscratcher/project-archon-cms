import { useMutation, useQueryClient } from '@tanstack/react-query';
import insightApi from '../../services/apiInsight';

function useUpdateInsight() {
  const token = localStorage.getItem('access_token') ?? '';
  const queryClient = useQueryClient();
  let insightIdx: number;

  const { mutate, isPending, error, data } = useMutation({
    mutationFn: (params: { idx: number; body: any }) => {
      insightIdx = params.idx;
      return insightApi.update(params.idx, params.body, token);
    },
    onSuccess: (res: any) => {
      console.log('success');
      queryClient.invalidateQueries({ queryKey: ['insight', `${insightIdx}`] });
      queryClient.invalidateQueries({ queryKey: ['insights'] });
      return res;
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { mutate, isPending, error, data };
}

export default useUpdateInsight;

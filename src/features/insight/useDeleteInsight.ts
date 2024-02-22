import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import insightApi from '../../services/apiInsight';

function useDeleteInsight() {
  const token = localStorage.getItem('access_token') ?? '';
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (idx: number) => {
      return insightApi.delete(idx, token);
    },
    onSuccess: (res: any) => {
      queryClient.invalidateQueries({ queryKey: ['insights'] });
      navigate(`/insights`);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { mutate, isPending, error };
}

export default useDeleteInsight;

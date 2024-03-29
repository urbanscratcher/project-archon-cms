import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import insightApi from '../../services/apiInsight';

function useUpdateInsight() {
  const token = localStorage.getItem('access_token') ?? '';
  const queryClient = useQueryClient();
  const [idx, setIdx] = useState(0);
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: (params: { idx: number; body: any }) => {
      setIdx(params.idx);
      return insightApi.update(params.idx, params.body, token);
    },
    onSuccess: (res: any) => {
      idx > 0 && queryClient.invalidateQueries({ queryKey: ['insight', `${idx}`] });
      queryClient.invalidateQueries({ queryKey: ['insights'] });
      idx > 0 && navigate(`/insights/${idx}`);
      return res;
    },
    onError: (err) => {
      console.error(err);
    },
  });

  return { mutate, isPending, error };
}

export default useUpdateInsight;

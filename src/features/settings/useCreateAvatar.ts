import { useMutation, useQueryClient } from '@tanstack/react-query';
import avatarApi from '../../services/apiAvatar';

function useCreateAvatar() {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('access_token') ?? '';

  const { mutate, isPending, error } = useMutation({
    mutationFn: (formData: any) => avatarApi.upsert(token, formData),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['avatar'] });
    },
    onError: (error) => {
      console.error('error...', error);
    },
  });

  return { createAvatar: mutate, isPending, error };
}

export default useCreateAvatar;
